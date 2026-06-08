'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { designMaterials, WhistleTypeId } from '@/lib/data';

interface MatProps {
  color: string;
  roughness: number;
  metalness: number;
  envMapIntensity?: number;
}

interface Props {
  color: string;
  design: string;
  whistleType?: WhistleTypeId;
  hover?: boolean;
}

const silver: MatProps = { color: '#b0b0b0', roughness: 0.1, metalness: 0.95 };
const dark:   MatProps = { color: '#080808', roughness: 1.0, metalness: 0.0  };

/* ── 1. PEA CLASSIC ─────────────────────────────────────────────── */
function PeaWhistle({ m }: { m: MatProps }) {
  return (
    <group>
      {/* Oval body */}
      <mesh castShadow scale={[1.45, 1.0, 0.82]}>
        <sphereGeometry args={[0.38, 64, 64]} />
        <meshStandardMaterial {...m} envMapIntensity={1.8} />
      </mesh>

      {/* Mouthpiece box */}
      <mesh castShadow position={[-0.74, 0.04, 0]}>
        <boxGeometry args={[0.46, 0.22, 0.28]} />
        <meshStandardMaterial {...m} envMapIntensity={1.8} />
      </mesh>

      {/* Mouthpiece slit opening */}
      <mesh position={[-0.74, 0.13, 0.15]}>
        <boxGeometry args={[0.38, 0.055, 0.02]} />
        <meshStandardMaterial {...dark} />
      </mesh>

      {/* Logo emboss circle on front face */}
      <mesh position={[0.18, 0, 0.37]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.025, 48]} />
        <meshStandardMaterial color={m.color} roughness={Math.min(m.roughness + 0.15, 1)} metalness={m.metalness * 0.6} />
      </mesh>
      {/* Inner ring on logo */}
      <mesh position={[0.18, 0, 0.39]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.14, 0.012, 8, 48]} />
        <meshStandardMaterial {...dark} />
      </mesh>

      {/* Keyring loop on mouthpiece */}
      <mesh position={[-0.98, 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.07, 0.018, 8, 32]} />
        <meshStandardMaterial {...m} envMapIntensity={1.8} />
      </mesh>

      {/* Split keyring */}
      <mesh position={[-0.98, 0.36, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.022, 8, 40]} />
        <meshStandardMaterial {...silver} />
      </mesh>

      {/* Pea (partially visible through gap) */}
      <mesh position={[0.1, -0.02, 0]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#cc7700" roughness={0.85} metalness={0.05} />
      </mesh>
    </group>
  );
}

/* ── 2. FOX 40 ───────────────────────────────────────────────────── */
function Fox40Whistle({ m }: { m: MatProps }) {
  return (
    <group>
      {/* Wide flat main body */}
      <mesh castShadow scale={[1.6, 0.55, 1.0]}>
        <boxGeometry args={[0.9, 0.7, 0.55]} />
        <meshStandardMaterial {...m} envMapIntensity={1.8} />
      </mesh>

      {/* Three chamber bumps on top */}
      {([-0.32, 0, 0.32] as number[]).map((x, i) => (
        <mesh key={i} castShadow position={[x, 0.25, 0]} scale={[0.85, 0.45, 0.85]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial {...m} envMapIntensity={1.8} />
        </mesh>
      ))}

      {/* Slots between chambers */}
      {([-0.16, 0.16] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.18, 0]}>
          <boxGeometry args={[0.07, 0.28, 0.58]} />
          <meshStandardMaterial {...dark} />
        </mesh>
      ))}

      {/* Wide mouthpiece */}
      <mesh castShadow position={[-0.9, 0.04, 0]}>
        <boxGeometry args={[0.38, 0.3, 0.42]} />
        <meshStandardMaterial {...m} envMapIntensity={1.8} />
      </mesh>

      {/* Mouthpiece slot */}
      <mesh position={[-0.9, 0.13, 0.22]}>
        <boxGeometry args={[0.32, 0.06, 0.02]} />
        <meshStandardMaterial {...dark} />
      </mesh>

      {/* Lanyard hole */}
      <mesh position={[0.83, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.07, 0.025, 8, 32]} />
        <meshStandardMaterial {...m} envMapIntensity={1.8} />
      </mesh>
      <mesh position={[0.83, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.02, 8, 40]} />
        <meshStandardMaterial {...silver} />
      </mesh>

      {/* Finger ridges on bottom */}
      {([-0.2, 0, 0.2] as number[]).map((x, i) => (
        <mesh key={i} position={[x, -0.28, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.58]} />
          <meshStandardMaterial color={m.color} roughness={Math.min(m.roughness + 0.2, 1)} metalness={m.metalness * 0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ── 3. METAL PRO ───────────────────────────────────────────────── */
function MetalWhistle({ m }: { m: MatProps }) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {/* Main tube */}
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.9, 48]} />
        <meshStandardMaterial {...m} envMapIntensity={2.0} />
      </mesh>

      {/* Ball chamber cap */}
      <mesh castShadow position={[0, 1.05, 0]} scale={[1, 0.8, 1]}>
        <sphereGeometry args={[0.22, 48, 48]} />
        <meshStandardMaterial {...m} envMapIntensity={2.0} />
      </mesh>

      {/* Sound hole on ball */}
      <mesh position={[0.21, 1.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 20]} />
        <meshStandardMaterial {...dark} />
      </mesh>

      {/* Tapered mouthpiece */}
      <mesh castShadow position={[0, -1.12, 0]}>
        <cylinderGeometry args={[0.09, 0.14, 0.48, 32]} />
        <meshStandardMaterial {...m} envMapIntensity={2.0} />
      </mesh>

      {/* Decorative rings */}
      {([-0.6, 0, 0.6] as number[]).map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.16, 0.018, 8, 48]} />
          <meshStandardMaterial {...silver} />
        </mesh>
      ))}

      {/* Lanyard ring */}
      <mesh position={[0, -1.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.022, 8, 32]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, -1.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.022, 8, 40]} />
        <meshStandardMaterial {...silver} />
      </mesh>
    </group>
  );
}

/* ── 4. GRIP ────────────────────────────────────────────────────── */
function GripWhistle({ m }: { m: MatProps }) {
  return (
    <group>
      {/* Flat ergonomic body */}
      <mesh castShadow scale={[1.5, 0.42, 1.1]}>
        <sphereGeometry args={[0.5, 48, 48]} />
        <meshStandardMaterial {...m} envMapIntensity={1.8} />
      </mesh>

      {/* Angled mouthpiece */}
      <mesh castShadow position={[-0.86, 0.1, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.38, 0.19, 0.3]} />
        <meshStandardMaterial {...m} envMapIntensity={1.8} />
      </mesh>

      {/* Mouthpiece slot */}
      <mesh position={[-0.87, 0.2, 0.16]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial {...dark} />
      </mesh>

      {/* Finger groove ridges */}
      {([-0.25, 0, 0.25] as number[]).map((x, i) => (
        <mesh key={i} castShadow position={[x, -0.24, 0]}>
          <boxGeometry args={[0.12, 0.08, 1.15]} />
          <meshStandardMaterial color={m.color} roughness={Math.min(m.roughness + 0.2, 1)} metalness={m.metalness * 0.4} />
        </mesh>
      ))}

      {/* Grip texture bumps on top */}
      {([-0.35, -0.12, 0.12, 0.35] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.22, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={m.color} roughness={Math.min(m.roughness + 0.3, 1)} metalness={m.metalness * 0.3} />
        </mesh>
      ))}

      {/* Keyring */}
      <mesh position={[0.86, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.07, 0.02, 8, 32]} />
        <meshStandardMaterial {...m} envMapIntensity={1.8} />
      </mesh>
      <mesh position={[0.86, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.021, 8, 40]} />
        <meshStandardMaterial {...silver} />
      </mesh>
    </group>
  );
}

/* ── 5. ULTRA MINI ──────────────────────────────────────────────── */
function MiniWhistle({ m }: { m: MatProps }) {
  return (
    <group>
      {/* Round ball body */}
      <mesh castShadow>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial {...m} envMapIntensity={2.0} />
      </mesh>

      {/* Small tube mouthpiece */}
      <mesh castShadow position={[-0.6, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.13, 0.35, 32]} />
        <meshStandardMaterial {...m} envMapIntensity={2.0} />
      </mesh>

      {/* Mouthpiece inner dark */}
      <mesh position={[-0.77, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.065, 0.065, 0.05, 20]} />
        <meshStandardMaterial {...dark} />
      </mesh>

      {/* Sound hole on top of ball */}
      <mesh position={[0, 0.51, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 20]} />
        <meshStandardMaterial {...dark} />
      </mesh>

      {/* Embossed equator ring */}
      <mesh>
        <torusGeometry args={[0.5, 0.015, 8, 64]} />
        <meshStandardMaterial color="#999999" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Decorative dots */}
      {([0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2] as number[]).map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#aaaaaa" roughness={0.1} metalness={0.95} />
        </mesh>
      ))}

      {/* Keyring */}
      <mesh position={[-0.78, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 8, 40]} />
        <meshStandardMaterial {...silver} />
      </mesh>
    </group>
  );
}

/* ── Main export ────────────────────────────────────────────────── */
export default function WhistleModel({ color, design, whistleType = 'pea' }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const mat = designMaterials[design] ?? designMaterials.Classic;
  const m: MatProps = { color, roughness: mat.roughness, metalness: mat.metalness };

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.07;
  });

  return (
    <group ref={groupRef} scale={1.25}>
      {whistleType === 'pea'   && <PeaWhistle   m={m} />}
      {whistleType === 'fox40' && <Fox40Whistle  m={m} />}
      {whistleType === 'metal' && <MetalWhistle  m={m} />}
      {whistleType === 'grip'  && <GripWhistle   m={m} />}
      {whistleType === 'mini'  && <MiniWhistle   m={m} />}
    </group>
  );
}
