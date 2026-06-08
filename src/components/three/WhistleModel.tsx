'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { designMaterials } from '@/lib/data';

interface Props {
  color: string;
  design: string;
  autoRotate?: boolean;
}

export default function WhistleModel({ color, design, autoRotate = false }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const mat = designMaterials[design] ?? designMaterials.Classic;

  useFrame((state) => {
    if (!groupRef.current) return;
    if (autoRotate) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.08;
  });

  const m = { color, roughness: mat.roughness, metalness: mat.metalness, envMapIntensity: 1.8 };

  return (
    <group ref={groupRef} scale={1.3}>
      {/* Main body tube */}
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 1.6, 64]} />
        <meshStandardMaterial {...m} />
      </mesh>

      {/* Ball chamber (end) */}
      <mesh castShadow position={[0.95, 0, 0]}>
        <sphereGeometry args={[0.28, 64, 64]} />
        <meshStandardMaterial {...m} />
      </mesh>

      {/* Sound hole on top of ball */}
      <mesh position={[0.95, 0.27, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0} />
      </mesh>

      {/* Mouthpiece (tapered) */}
      <mesh castShadow position={[-1.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.18, 0.52, 32]} />
        <meshStandardMaterial {...m} />
      </mesh>

      {/* Lanyard ring */}
      <mesh position={[-1.34, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.025, 8, 32]} />
        <meshStandardMaterial color="#aaaaaa" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Ring accents */}
      {([-0.45, 0.45] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.225, 0.018, 8, 64]} />
          <meshStandardMaterial color="#999999" roughness={0.12} metalness={0.92} />
        </mesh>
      ))}

      {/* Pea inside ball chamber */}
      <mesh position={[0.95, 0, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#cc7700" roughness={0.9} metalness={0.05} />
      </mesh>
    </group>
  );
}
