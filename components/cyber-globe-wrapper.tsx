"use client"

import dynamic from "next/dynamic"

const CyberGlobe = dynamic(
  () => import("@/components/cyber-globe").then((mod) => mod.CyberGlobe),
  { ssr: false }
)

export function CyberGlobeWrapper() {
  return <CyberGlobe />
}
