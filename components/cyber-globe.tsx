"use client"

import { useRef, useMemo, useCallback, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Line } from "@react-three/drei"
import * as THREE from "three"

function generateSpherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = 2 * Math.PI * Math.random()
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }
  return positions
}

function generateConnections(nodePositions: Float32Array, connectionCount: number) {
  const connections: [THREE.Vector3, THREE.Vector3][] = []
  const nodeCount = nodePositions.length / 3

  for (let i = 0; i < connectionCount; i++) {
    const a = Math.floor(Math.random() * nodeCount)
    const b = Math.floor(Math.random() * nodeCount)
    if (a === b) continue

    const posA = new THREE.Vector3(
      nodePositions[a * 3],
      nodePositions[a * 3 + 1],
      nodePositions[a * 3 + 2]
    )
    const posB = new THREE.Vector3(
      nodePositions[b * 3],
      nodePositions[b * 3 + 1],
      nodePositions[b * 3 + 2]
    )

    if (posA.distanceTo(posB) < 1.8) {
      connections.push([posA, posB])
    }
  }

  return connections
}

// Theme-aware color selector
function getGlobeColor(isDark: boolean): string {
  return isDark ? "#00e68a" : "#6366f1" // cyan for dark, indigo for light
}

function GlobePoints({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const positions = useMemo(() => generateSpherePoints(600, 2.5), [])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08
      pointsRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={getGlobeColor(isDark)}
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={isDark ? 0.8 : 0.6}
      />
    </Points>
  )
}

function GlobeConnections({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodePositions = useMemo(() => generateSpherePoints(80, 2.5), [])
  const connections = useMemo(
    () => generateConnections(nodePositions, 200),
    [nodePositions]
  )

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08
      groupRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {connections.map((pair, i) => (
        <Line
          key={i}
          points={[pair[0], pair[1]]}
          color={getGlobeColor(isDark)}
          lineWidth={0.5}
          opacity={isDark ? 0.15 : 0.1}
          transparent
        />
      ))}
    </group>
  )
}

function GlobeWireframe({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08
      meshRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial
        color={getGlobeColor(isDark)}
        wireframe
        transparent
        opacity={isDark ? 0.04 : 0.03}
      />
    </mesh>
  )
}

function DataStreams({ isDark }: { isDark: boolean }) {
  const count = 30
  const streamsRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2.5
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5
      pos[i * 3 + 2] = Math.sin(angle) * radius
      vel[i * 3] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 1] = 0.02 + Math.random() * 0.03
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    return { positions: pos, velocities: vel }
  }, [])

  useFrame(() => {
    if (!streamsRef.current) return
    const posArray = streamsRef.current.geometry.attributes.position
      .array as Float32Array
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3]
      posArray[i * 3 + 1] += velocities[i * 3 + 1]
      posArray[i * 3 + 2] += velocities[i * 3 + 2]

      if (posArray[i * 3 + 1] > 4) {
        posArray[i * 3 + 1] = -4
      }
    }
    streamsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={streamsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={isDark ? "#00cccc" : "#818cf8"}
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        opacity={isDark ? 0.6 : 0.4}
      />
    </Points>
  )
}

function PointerLight({ isDark }: { isDark: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null)
  const { pointer, viewport } = useThree()

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = (pointer.x * viewport.width) / 2
      lightRef.current.position.y = (pointer.y * viewport.height) / 2
      lightRef.current.position.z = 4
    }
  })

  return <pointLight ref={lightRef} intensity={2} color={getGlobeColor(isDark)} distance={8} />
}

function InnerRing({ isDark }: { isDark: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3.2, 0.01, 16, 100]} />
      <meshBasicMaterial color={isDark ? "#00cccc" : "#a5b4fc"} transparent opacity={isDark ? 0.2 : 0.15} />
    </mesh>
  )
}

function OuterRing({ isDark }: { isDark: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.15
      ringRef.current.rotation.x = Math.PI / 3
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3.6, 0.008, 16, 100]} />
      <meshBasicMaterial color={getGlobeColor(isDark)} transparent opacity={isDark ? 0.1 : 0.06} />
    </mesh>
  )
}

function Scene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (pointer.x * 0.3 - groupRef.current.rotation.y) * 0.02
      groupRef.current.rotation.x += (-pointer.y * 0.2 - groupRef.current.rotation.x) * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <GlobeWireframe isDark={isDark} />
      <GlobePoints isDark={isDark} />
      <GlobeConnections isDark={isDark} />
      <DataStreams isDark={isDark} />
      <InnerRing isDark={isDark} />
      <OuterRing isDark={isDark} />
      <PointerLight isDark={isDark} />
      <ambientLight intensity={0.1} />
    </group>
  )
}

export function CyberGlobe() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark") || !document.documentElement.classList.contains("light"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor("transparent")
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 z-0 opacity-60" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        onCreated={onCreated}
        style={{ background: "transparent" }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  )
}
