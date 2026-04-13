"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function WireframeCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial color="#2563eb" wireframe emissive="#1e3a5f" emissiveIntensity={0.4} transparent opacity={0.5} />
      </mesh>
    </Float>
  );
}

function OrbitingRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = tilt;
      ref.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 16, 100]} />
      <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.5} transparent opacity={0.25} />
    </mesh>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.02; });
  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial color="#60a5fa" size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.15} color="#1e3a5f" />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#2563eb" />
        <pointLight position={[-5, -3, 3]} intensity={0.2} color="#1e3a5f" />
        <WireframeCore />
        <OrbitingRing radius={2.8} speed={0.2} tilt={0.5} />
        <OrbitingRing radius={3.2} speed={-0.15} tilt={-0.3} />
        <FloatingParticles />
        <Stars radius={50} depth={50} count={1500} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
