'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { designMaterials, WhistleTypeId, DesignMaterial } from '@/lib/data';

interface Props {
  color: string;
  design: string;
  whistleType?: WhistleTypeId;
}

type M = DesignMaterial & { color: string; envMapIntensity: number };

const SILVER: M = { color: '#c0c0c0', roughness: 0.06, metalness: 0.98, clearcoat: 0, clearcoatRoughness: 0, envMapIntensity: 2 };
const DARK:   M = { color: '#040404', roughness: 1,    metalness: 0,    clearcoat: 0, clearcoatRoughness: 0, envMapIntensity: 0 };

function Mat({ m }: { m: M }) {
  return (
    <meshPhysicalMaterial
      color={m.color}
      roughness={m.roughness}
      metalness={m.metalness}
      clearcoat={m.clearcoat}
      clearcoatRoughness={m.clearcoatRoughness}
      envMapIntensity={m.envMapIntensity}
    />
  );
}

/* ── 1. PEA CLASSIC ── closest to the photo ── */
function PeaWhistle({ m }: { m: M }) {
  return (
    <group>
      {/* Oval body */}
      <mesh castShadow receiveShadow scale={[1.52, 1.0, 0.82]}>
        <sphereGeometry args={[0.4, 128, 64]} />
        <Mat m={m} />
      </mesh>

      {/* Seam line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.005, 6, 128]} />
        <meshPhysicalMaterial color={m.color} roughness={1} metalness={0} clearcoat={0} clearcoatRoughness={0} />
      </mesh>

      {/* Mouthpiece box */}
      <mesh castShadow receiveShadow position={[-0.74, 0.04, 0]}>
        <boxGeometry args={[0.48, 0.2, 0.28]} />
        <Mat m={m} />
      </mesh>
      {/* Mouthpiece top rounding */}
      <mesh castShadow position={[-0.74, 0.14, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.065, 0.065, 0.28, 32]} />
        <Mat m={m} />
      </mesh>
      {/* Slit opening */}
      <mesh position={[-0.74, 0.13, 0.149]}>
        <boxGeometry args={[0.38, 0.048, 0.015]} />
        <Mat m={DARK} />
      </mesh>

      {/* Logo emboss circle */}
      <mesh position={[0.22, 0, 0.395]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.016, 64]} />
        <meshPhysicalMaterial
          color={m.color}
          roughness={Math.min(m.roughness + 0.12, 1)}
          metalness={m.metalness * 0.5}
          clearcoat={m.clearcoat * 0.5}
          clearcoatRoughness={m.clearcoatRoughness}
          envMapIntensity={m.envMapIntensity * 0.6}
        />
      </mesh>
      {/* Logo ring */}
      <mesh position={[0.22, 0, 0.41]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.011, 8, 64]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.6} metalness={0.2} clearcoat={0} clearcoatRoughness={0} />
      </mesh>
      {/* Logo P dot */}
      <mesh position={[0.22, 0, 0.412]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.008, 32]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.5} metalness={0.1} clearcoat={0} clearcoatRoughness={0} />
      </mesh>

      {/* Keyring loop on mouthpiece */}
      <mesh position={[-0.97, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.052, 0.02, 10, 32]} />
        <Mat m={m} />
      </mesh>
      {/* Split ring (double torus = realistic keyring) */}
      <mesh position={[-0.97, 0.36, 0]} rotation={[Math.PI / 2, 0.05, 0]}>
        <torusGeometry args={[0.115, 0.021, 12, 64]} />
        <Mat m={SILVER} />
      </mesh>
      <mesh position={[-0.97, 0.332, 0]} rotation={[Math.PI / 2, -0.05, 0]}>
        <torusGeometry args={[0.09, 0.018, 12, 64]} />
        <Mat m={SILVER} />
      </mesh>

      {/* Pea */}
      <mesh position={[0.1, -0.01, 0]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshPhysicalMaterial color="#cc7700" roughness={0.78} metalness={0.05} clearcoat={0.1} clearcoatRoughness={0.5} />
      </mesh>
    </group>
  );
}

/* ── 2. FOX 40 ── */
function Fox40Whistle({ m }: { m: M }) {
  return (
    <group>
      <mesh castShadow receiveShadow scale={[1.55, 0.52, 1.0]}>
        <boxGeometry args={[0.92, 0.72, 0.56]} />
        <Mat m={m} />
      </mesh>
      {([-0.32, 0, 0.32] as number[]).map((x, i) => (
        <mesh key={i} castShadow position={[x, 0.26, 0]} scale={[0.85, 0.44, 0.85]}>
          <sphereGeometry args={[0.23, 32, 32]} />
          <Mat m={m} />
        </mesh>
      ))}
      {([-0.16, 0.16] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.18, 0]}>
          <boxGeometry args={[0.07, 0.28, 0.59]} />
          <Mat m={DARK} />
        </mesh>
      ))}
      <mesh castShadow position={[-0.91, 0.04, 0]}>
        <boxGeometry args={[0.36, 0.3, 0.43]} />
        <Mat m={m} />
      </mesh>
      <mesh position={[-0.91, 0.13, 0.224]}>
        <boxGeometry args={[0.3, 0.055, 0.015]} />
        <Mat m={DARK} />
      </mesh>
      <mesh position={[0.84, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.068, 0.024, 10, 32]} />
        <Mat m={m} />
      </mesh>
      <mesh position={[0.84, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.112, 0.021, 12, 64]} />
        <Mat m={SILVER} />
      </mesh>
      {([-0.2, 0, 0.2] as number[]).map((x, i) => (
        <mesh key={i} position={[x, -0.28, 0]}>
          <boxGeometry args={[0.06, 0.07, 0.58]} />
          <meshPhysicalMaterial color={m.color} roughness={Math.min(m.roughness + 0.2, 1)} metalness={m.metalness * 0.4} clearcoat={0} clearcoatRoughness={0} />
        </mesh>
      ))}
    </group>
  );
}

/* ── 3. METAL PRO ── */
function MetalWhistle({ m }: { m: M }) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.92, 64]} />
        <Mat m={m} />
      </mesh>
      <mesh castShadow position={[0, 1.06, 0]} scale={[1, 0.78, 1]}>
        <sphereGeometry args={[0.23, 48, 48]} />
        <Mat m={m} />
      </mesh>
      <mesh position={[0.225, 1.06, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.068, 0.068, 0.04, 20]} />
        <Mat m={DARK} />
      </mesh>
      <mesh castShadow position={[0, -1.13, 0]}>
        <cylinderGeometry args={[0.09, 0.145, 0.5, 32]} />
        <Mat m={m} />
      </mesh>
      {([-0.58, 0, 0.58] as number[]).map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.162, 0.017, 8, 48]} />
          <Mat m={SILVER} />
        </mesh>
      ))}
      <mesh position={[0, -1.43, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.095, 0.022, 10, 32]} />
        <Mat m={SILVER} />
      </mesh>
      <mesh position={[0, -1.64, 0]} rotation={[Math.PI / 2, 0.04, 0]}>
        <torusGeometry args={[0.13, 0.022, 12, 64]} />
        <Mat m={SILVER} />
      </mesh>
    </group>
  );
}

/* ── 4. GRIP ── */
function GripWhistle({ m }: { m: M }) {
  return (
    <group>
      <mesh castShadow receiveShadow scale={[1.52, 0.42, 1.12]}>
        <sphereGeometry args={[0.5, 64, 48]} />
        <Mat m={m} />
      </mesh>
      <mesh castShadow position={[-0.87, 0.1, 0]} rotation={[0, 0, 0.24]}>
        <boxGeometry args={[0.38, 0.19, 0.3]} />
        <Mat m={m} />
      </mesh>
      <mesh position={[-0.88, 0.2, 0.155]} rotation={[0, 0, 0.24]}>
        <boxGeometry args={[0.3, 0.048, 0.014]} />
        <Mat m={DARK} />
      </mesh>
      {([-0.26, 0, 0.26] as number[]).map((x, i) => (
        <mesh key={i} castShadow position={[x, -0.24, 0]}>
          <boxGeometry args={[0.13, 0.08, 1.16]} />
          <meshPhysicalMaterial color={m.color} roughness={Math.min(m.roughness + 0.22, 1)} metalness={m.metalness * 0.35} clearcoat={0} clearcoatRoughness={0} />
        </mesh>
      ))}
      {([-0.36, -0.12, 0.12, 0.36] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.22, 0]}>
          <sphereGeometry args={[0.058, 16, 16]} />
          <meshPhysicalMaterial color={m.color} roughness={Math.min(m.roughness + 0.3, 1)} metalness={m.metalness * 0.3} clearcoat={0} clearcoatRoughness={0} />
        </mesh>
      ))}
      <mesh position={[0.87, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.068, 0.02, 10, 32]} />
        <Mat m={m} />
      </mesh>
      <mesh position={[0.87, 0.3, 0]} rotation={[Math.PI / 2, 0.04, 0]}>
        <torusGeometry args={[0.112, 0.021, 12, 64]} />
        <Mat m={SILVER} />
      </mesh>
    </group>
  );
}

/* ── 5. ULTRA MINI ── */
function MiniWhistle({ m }: { m: M }) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.52, 128, 64]} />
        <Mat m={m} />
      </mesh>
      <mesh castShadow position={[-0.62, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.135, 0.36, 32]} />
        <Mat m={m} />
      </mesh>
      <mesh position={[-0.8, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.062, 0.062, 0.04, 20]} />
        <Mat m={DARK} />
      </mesh>
      <mesh position={[0, 0.525, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 20]} />
        <Mat m={DARK} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.52, 0.013, 8, 128]} />
        <Mat m={SILVER} />
      </mesh>
      {([0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2] as number[]).map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.52, 0, Math.sin(a) * 0.52]}>
          <sphereGeometry args={[0.042, 16, 16]} />
          <Mat m={SILVER} />
        </mesh>
      ))}
      <mesh position={[-0.82, 0.28, 0]} rotation={[Math.PI / 2, 0.04, 0]}>
        <torusGeometry args={[0.108, 0.021, 12, 64]} />
        <Mat m={SILVER} />
      </mesh>
    </group>
  );
}

/* ── Root export ── */
export default function WhistleModel({ color, design, whistleType = 'pea' }: Props) {
  const ref = useRef<THREE.Group>(null);
  const mat = designMaterials[design] ?? designMaterials.Classic;
  const m: M = { ...mat, color, envMapIntensity: 2.2 };

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.85) * 0.07;
  });

  return (
    <group ref={ref} scale={1.28}>
      {whistleType === 'pea'   && <PeaWhistle   m={m} />}
      {whistleType === 'fox40' && <Fox40Whistle  m={m} />}
      {whistleType === 'metal' && <MetalWhistle  m={m} />}
      {whistleType === 'grip'  && <GripWhistle   m={m} />}
      {whistleType === 'mini'  && <MiniWhistle   m={m} />}
    </group>
  );
}
