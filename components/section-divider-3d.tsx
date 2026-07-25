"use client"

import { useRef, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.5
      meshRef.current.rotation.y = t * 0.3
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.2
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = t * 0.5
      edgesRef.current.rotation.y = t * 0.3
      edgesRef.current.position.y = Math.sin(t * 0.8) * 0.2
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#00e68a" transparent opacity={0.05} />
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.OctahedronGeometry(0.6, 0)]} />
        <lineBasicMaterial color="#00e68a" transparent opacity={0.6} />
      </lineSegments>
    </group>
  )
}

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = -t * 0.3
      meshRef.current.rotation.z = t * 0.4
      meshRef.current.position.y = Math.sin(t * 0.6 + 1) * 0.15
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = -t * 0.3
      edgesRef.current.rotation.z = t * 0.4
      edgesRef.current.position.y = Math.sin(t * 0.6 + 1) * 0.15
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#00cccc" transparent opacity={0.04} />
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(0.5, 0)]} />
        <lineBasicMaterial color="#00cccc" transparent opacity={0.5} />
      </lineSegments>
    </group>
  )
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4
      meshRef.current.rotation.y = -t * 0.6
      meshRef.current.position.y = Math.sin(t * 0.7 + 2) * 0.2
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = t * 0.4
      edgesRef.current.rotation.y = -t * 0.6
      edgesRef.current.position.y = Math.sin(t * 0.7 + 2) * 0.2
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <torusGeometry args={[0.4, 0.15, 8, 16]} />
        <meshBasicMaterial color="#00e68a" transparent opacity={0.04} />
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.TorusGeometry(0.4, 0.15, 8, 16)]} />
        <lineBasicMaterial color="#00e68a" transparent opacity={0.5} />
      </lineSegments>
    </group>
  )
}

type DividerVariant = "octahedron" | "icosahedron" | "torus"

function DividerScene({ variant }: { variant: DividerVariant }) {
  return (
    <>
      {variant === "octahedron" && <FloatingOctahedron />}
      {variant === "icosahedron" && <FloatingIcosahedron />}
      {variant === "torus" && <FloatingTorus />}
      <ambientLight intensity={0.5} />
    </>
  )
}

export function SectionDivider3D({ variant = "octahedron" }: { variant?: DividerVariant }) {
  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor("transparent")
  }, [])

  return (
    <div className="relative h-24 w-full flex items-center justify-center" aria-hidden="true">
      {/* Line accents */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center gap-4 px-6 max-w-6xl">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="w-24 h-24">
          <Canvas
            camera={{ position: [0, 0, 2.5], fov: 50 }}
            dpr={[1, 1.5]}
            onCreated={onCreated}
            style={{ background: "transparent" }}
          >
            <DividerScene variant={variant} />
          </Canvas>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </div>
  )
}
