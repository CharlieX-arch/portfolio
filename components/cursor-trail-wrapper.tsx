"use client"

import dynamic from "next/dynamic"

const CursorTrail = dynamic(
  () => import("@/components/cursor-trail").then((mod) => mod.CursorTrail),
  { ssr: false }
)

export function CursorTrailWrapper() {
  return <CursorTrail />
}
