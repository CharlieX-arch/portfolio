"use client"

import dynamic from "next/dynamic"

const ParticleNetwork = dynamic(
  () =>
    import("@/components/particle-network").then((mod) => mod.ParticleNetwork),
  { ssr: false }
)

export function ParticleNetworkWrapper() {
  return <ParticleNetwork />
}
