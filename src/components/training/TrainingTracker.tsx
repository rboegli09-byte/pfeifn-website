'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Check,
  Flame,
  Gift,
  Lock,
  RotateCcw,
  Target,
  TrendingUp,
} from 'lucide-react';
import {
  DayEntry,
  EXERCISES,
  STORAGE_KEY,
  STORAGE_VERSION,
  TrackerState,
  addDays,
  buildDayKeys,
  christmasFor,
  countDone,
  diffInDays,
  formatLong,
  fromKey,
  isDayComplete,
  lastTrainingDay,
  migrateDays,
  monthLabel,
  startOfDay,
  targetLabel,
  toKey,
  weekIndexFor,
} from '@/lib/training';

const WEEKDAY_HEADS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

function loadState(todayKey: string): TrackerState {
  const fallback: TrackerState = { version: STORAGE_VERSION, startDate: todayKey, days: {} };
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<TrackerState>;
    if (!parsed || typeof parsed !== 'object') return fallback;
    const days = parsed.days && typeof parsed.days === 'object' ? (parsed.days as Record<string, DayEntry>) : {};
    return {
      version: STORAGE_VERSION,
      startDate:
        typeof parsed.startDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(parsed.startDate)
          ? parsed.startDate
          : todayKey,
      days: parsed.version === STORAGE_VERSION ? days : migrateDays(days),
    };
  } catch {
    return fallback;
  }
}

/** Montag = 0 ... Sonntag = 6 */
function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

export default function TrainingTracker() {
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState<string>('');
  const [state, setState] = useState<TrackerState | null>(null);
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    const todayKey = toKey(startOfDay(new Date()));
    const loaded = loadState(todayKey);
    setToday(todayKey);
    setState(loaded);
    setSelected(todayKey);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !state) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Speicher nicht verfügbar: die App läuft trotzdem weiter.
    }
  }, [mounted, state]);

  const toggle = useCallback((dayKey: string, exerciseId: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const entry = prev.days[dayKey] ?? {};
      const next: DayEntry = { ...entry, [exerciseId]: !entry[exerciseId as keyof DayEntry] };
      return { ...prev, days: { ...prev.days, [dayKey]: next } };
    });
  }, []);

  const toggleWholeDay = useCallback((dayKey: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const entry = prev.days[dayKey] ?? {};
      const complete = EXERCISES.every((exercise) => entry[exercise.id] === true);
      const next: DayEntry = {};
      EXERCISES.forEach((exercise) => {
        next[exercise.id] = !complete;
      });
      return { ...prev, days: { ...prev.days, [dayKey]: next } };
    });
  }, []);

  const reset = useCallback(() => {
    if (!window.confirm('Wirklich alle Einträge löschen und neu starten?')) return;
    const todayKey = toKey(startOfDay(new Date()));
    setState({ version: STORAGE_VERSION, startDate: todayKey, days: {} });
    setSelected(todayKey);
  }, []);

  const model = useMemo(() => {
    if (!state || !today) return null;

    const start = fromKey(state.startDate);
    const christmas = christmasFor(start);
    const end = lastTrainingDay(start);
    const dayKeys = buildDayKeys(start, end);
    const todayDate = fromKey(today);

    const total = dayKeys.length;
    const done = dayKeys.filter((key) => isDayComplete(state.days[key])).length;

    const pastKeys = dayKeys.filter((key) => diffInDays(fromKey(key), todayDate) < 0);
    const missed = pastKeys.filter((key) => !isDayComplete(state.days[key])).length;

    let streak = 0;
    const streakStart = diffInDays(todayDate, end) > 0 ? end : todayDate;
    let cursor = isDayComplete(state.days[toKey(streakStart)]) ? streakStart : addDays(streakStart, -1);
    while (diffInDays(cursor, start) >= 0 && isDayComplete(state.days[toKey(cursor)])) {
      streak += 1;
      cursor = addDays(cursor, -1);
    }

    const daysToChristmas = Math.max(diffInDays(christmas, todayDate), 0);
    const rewardUnlocked = done === total && total > 0;

    const months: { label: string; pad: number; keys: string[] }[] = [];
    dayKeys.forEach((key) => {
      const date = fromKey(key);
      const label = monthLabel(date);
      let bucket = months.find((month) => month.label === label);
      if (!bucket) {
        bucket = { label, pad: mondayIndex(date), keys: [] };
        months.push(bucket);
      }
      bucket.keys.push(key);
    });

    return {
      start,
      end,
      christmas,
      dayKeys,
      total,
      done,
      missed,
      streak,
      daysToChristmas,
      rewardUnlocked,
      months,
      todayDate,
    };
  }, [state, today]);

  if (!mounted || !state || !model) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-24 text-center text-zinc-500">
        Challenge wird geladen ...
      </div>
    );
  }

  const selectedKey = model.dayKeys.includes(selected) ? selected : today;
  const selectedDate = fromKey(selectedKey);
  const selectedEntry = state.days[selectedKey];
  const isFuture = diffInDays(selectedDate, model.todayDate) > 0;
  const isToday = selectedKey === today;
  const week = weekIndexFor(state.startDate, selectedKey);
  const percent = model.total > 0 ? Math.round((model.done / model.total) * 100) : 0;

  const stats = [
    { label: 'Tage bis Weihnachten', value: String(model.daysToChristmas), icon: Gift },
    { label: 'Tage geschafft', value: `${model.done} / ${model.total}`, icon: Check },
    { label: 'Aktuelle Serie', value: `${model.streak} ${model.streak === 1 ? 'Tag' : 'Tage'}`, icon: Flame },
    { label: 'Verpasste Tage', value: String(model.missed), icon: Target },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Weihnachts-Challenge
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          An Weihnachten eine Maschine
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Jeden Tag vier Übungen für Oberkörper, Bauch und Arme. Kein Tag wird ausgelassen.
          Start war der {formatLong(model.start)}, letzter Trainingstag ist der {formatLong(model.end)}.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <Icon className="h-4 w-4 text-brand" strokeWidth={2} />
            <p className="mt-3 text-2xl font-semibold tabular-nums">{value}</p>
            <p className="mt-1 text-xs text-zinc-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-zinc-400">Gesamtfortschritt</span>
          <span className="font-semibold tabular-nums">{percent} Prozent</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {isToday ? 'Heute' : formatLong(selectedDate)}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {isToday ? formatLong(selectedDate) : 'Nachtragen für diesen Tag'} · Woche {week + 1}
            </p>
          </div>
          {!isFuture && (
            <button
              type="button"
              onClick={() => toggleWholeDay(selectedKey)}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-brand hover:text-white"
            >
              {isDayComplete(selectedEntry) ? 'Tag zurücksetzen' : 'Alles erledigt'}
            </button>
          )}
        </div>

        {isFuture ? (
          <p className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
            <Lock className="h-4 w-4" strokeWidth={2} />
            Dieser Tag ist noch nicht dran.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {EXERCISES.map((exercise) => {
              const active = selectedEntry?.[exercise.id] === true;
              return (
                <li key={exercise.id}>
                  <button
                    type="button"
                    onClick={() => toggle(selectedKey, exercise.id)}
                    aria-pressed={active}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                      active
                        ? 'border-emerald-500/60 bg-emerald-500/10'
                        : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-600'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition ${
                        active ? 'border-emerald-500 bg-emerald-500 text-zinc-950' : 'border-zinc-700 text-transparent'
                      }`}
                    >
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-brand">
                        {exercise.group}
                      </span>
                      <span className="mt-1 block font-semibold">
                        {exercise.name} · {targetLabel(exercise, week)}
                      </span>
                      <span className="mt-1 block text-sm text-zinc-500">{exercise.hint}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-5 flex items-center gap-2 text-sm text-zinc-500">
          <TrendingUp className="h-4 w-4 text-brand" strokeWidth={2} />
          Jede Woche kommt etwas Volumen dazu. Woche 1 startet leicht, am Ende stehst du deutlich höher.
        </p>
      </section>

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Kalender bis Weihnachten</h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded border border-emerald-500 bg-emerald-500" />
              Komplett
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded border border-amber-500 bg-amber-500/30" />
              Angefangen
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded border border-brand bg-brand/20" />
              Verpasst
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded border border-zinc-700 bg-zinc-900" />
              Offen
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {model.months.map((month) => (
            <div key={month.label} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <p className="text-sm font-semibold">{month.label}</p>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-600">
                {WEEKDAY_HEADS.map((head) => (
                  <span key={head}>{head}</span>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {Array.from({ length: month.pad }).map((_, index) => (
                  <span key={`pad-${index}`} />
                ))}
                {month.keys.map((key) => {
                  const date = fromKey(key);
                  const entry = state.days[key];
                  const doneCount = countDone(entry);
                  const complete = doneCount === EXERCISES.length;
                  const past = diffInDays(date, model.todayDate) < 0;
                  const current = key === today;
                  const isSelected = key === selectedKey;

                  let tone = 'border-zinc-800 bg-zinc-950 text-zinc-600';
                  if (complete) tone = 'border-emerald-500 bg-emerald-500 text-zinc-950';
                  else if (doneCount > 0) tone = 'border-amber-500 bg-amber-500/25 text-amber-200';
                  else if (past) tone = 'border-brand bg-brand/20 text-brand';

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelected(key)}
                      title={`${formatLong(date)} · ${doneCount} von ${EXERCISES.length} Übungen`}
                      className={`aspect-square rounded text-[11px] font-semibold tabular-nums transition hover:opacity-80 ${tone} ${
                        current ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900' : ''
                      } ${isSelected && !current ? 'ring-1 ring-zinc-400' : ''}`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`mt-8 rounded-2xl border p-6 sm:p-8 ${
          model.rewardUnlocked ? 'border-emerald-500/60 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-900/60'
        }`}
      >
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950">
            {model.rewardUnlocked ? (
              <Gift className="h-6 w-6 text-emerald-400" strokeWidth={2} />
            ) : (
              <Lock className="h-6 w-6 text-brand" strokeWidth={2} />
            )}
          </span>
          <div>
            <h2 className="text-xl font-semibold">Belohnung: AirPods Pro</h2>
            <p className="mt-2 text-sm text-zinc-400">
              {model.rewardUnlocked
                ? `Alle ${model.total} Tage stehen. Am ${formatLong(model.christmas)} sind die AirPods Pro verdient.`
                : `Noch ${model.total - model.done} von ${model.total} Tagen offen. Jeder Tag zählt, kein Tag wird geschenkt.`}
            </p>
            {model.missed > 0 && !model.rewardUnlocked && (
              <p className="mt-2 text-sm text-brand">
                {model.missed} vergangene {model.missed === 1 ? 'Tag ist' : 'Tage sind'} noch nicht abgehakt.
                Wenn du trainiert hast, trag es im Kalender nach.
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 text-sm text-zinc-600 transition hover:text-brand"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} />
          Challenge zurücksetzen
        </button>
      </div>
    </div>
  );
}
