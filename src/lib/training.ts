export type ExerciseId = 'oberkoerper' | 'bauch' | 'klappmesser' | 'arme';

export interface Exercise {
  id: ExerciseId;
  group: string;
  name: string;
  hint: string;
  sets: number;
  unit: 'reps' | 'sec';
  base: number;
  step: number;
}

/** Vier feste Übungen: Oberkörper, zweimal Bauch, Arme. */
export const EXERCISES: Exercise[] = [
  {
    id: 'oberkoerper',
    group: 'Oberkörper',
    name: 'Liegestütze',
    hint: 'Körper bleibt eine Linie, Brust bis knapp über den Boden.',
    sets: 3,
    unit: 'reps',
    base: 15,
    step: 2,
  },
  {
    id: 'bauch',
    group: 'Bauch',
    name: 'Unterarmstütz',
    hint: 'Bauch fest, Hüfte nicht durchhängen lassen.',
    sets: 3,
    unit: 'sec',
    base: 45,
    step: 5,
  },
  {
    id: 'klappmesser',
    group: 'Bauch',
    name: 'Klappmesser',
    hint: 'Arme und Beine gleichzeitig hoch, Bewegung kommt aus dem Bauch.',
    sets: 3,
    unit: 'reps',
    base: 12,
    step: 2,
  },
  {
    id: 'arme',
    group: 'Arme',
    name: 'Dips an der Stuhlkante',
    hint: 'Ellenbogen eng am Körper, langsam nach unten.',
    sets: 3,
    unit: 'reps',
    base: 12,
    step: 2,
  },
];

/** Ab Woche 12 wird nicht weiter gesteigert. */
export const MAX_WEEK = 12;

export const STORAGE_KEY = 'pfeifn-weihnachts-challenge-v1';

/** Version 1: drei Übungen. Version 2: zusätzlich das Klappmesser. */
export const STORAGE_VERSION = 2;

export type DayEntry = Partial<Record<ExerciseId, boolean>>;

/**
 * Übungen der ersten Version. Wer damals einen Tag komplett hatte, soll ihn
 * nach dem Nachrüsten des Klappmessers nicht wieder als offen sehen. Läuft nur
 * einmal beim Laden von Daten ohne Versionsnummer.
 */
export const LEGACY_EXERCISE_IDS: ExerciseId[] = ['oberkoerper', 'bauch', 'arme'];

export function migrateDays(days: Record<string, DayEntry>): Record<string, DayEntry> {
  const migrated: Record<string, DayEntry> = {};
  Object.entries(days).forEach(([key, entry]) => {
    const wasComplete = LEGACY_EXERCISE_IDS.every((id) => entry?.[id] === true);
    migrated[key] = wasComplete ? { ...entry, klappmesser: true } : entry;
  });
  return migrated;
}

export interface TrackerState {
  version: number;
  startDate: string;
  days: Record<string, DayEntry>;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

export function fromKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return startOfDay(next);
}

export function diffInDays(a: Date, b: Date): number {
  const ms = startOfDay(a).getTime() - startOfDay(b).getTime();
  return Math.round(ms / 86_400_000);
}

/** Der nächste 25. Dezember ab dem Startdatum. Letzter Trainingstag ist der 24. */
export function christmasFor(start: Date): Date {
  const thisYear = new Date(start.getFullYear(), 11, 25);
  return diffInDays(thisYear, start) >= 1 ? thisYear : new Date(start.getFullYear() + 1, 11, 25);
}

export function lastTrainingDay(start: Date): Date {
  return addDays(christmasFor(start), -1);
}

export function buildDayKeys(start: Date, end: Date): string[] {
  const keys: string[] = [];
  let cursor = startOfDay(start);
  const last = startOfDay(end);
  while (cursor.getTime() <= last.getTime()) {
    keys.push(toKey(cursor));
    cursor = addDays(cursor, 1);
  }
  return keys;
}

export function weekIndexFor(startKey: string, dayKey: string): number {
  const index = diffInDays(fromKey(dayKey), fromKey(startKey));
  return Math.min(Math.floor(Math.max(index, 0) / 7), MAX_WEEK);
}

export function targetFor(exercise: Exercise, week: number): number {
  return exercise.base + exercise.step * week;
}

export function targetLabel(exercise: Exercise, week: number): string {
  const value = targetFor(exercise, week);
  return exercise.unit === 'reps'
    ? `${exercise.sets} Sätze × ${value} Wiederholungen`
    : `${exercise.sets} Sätze × ${value} Sekunden`;
}

export function isDayComplete(entry: DayEntry | undefined): boolean {
  if (!entry) return false;
  return EXERCISES.every((exercise) => entry[exercise.id] === true);
}

export function countDone(entry: DayEntry | undefined): number {
  if (!entry) return 0;
  return EXERCISES.filter((exercise) => entry[exercise.id] === true).length;
}

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export function formatLong(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function monthLabel(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
