"use client"

import dynamic from "next/dynamic"

const SectionDivider3D = dynamic(
  () =>
    import("@/components/section-divider-3d").then(
      (mod) => mod.SectionDivider3D
    ),
  { ssr: false }
)

export function SectionDivider3DWrapper({
  variant,
}: {
  variant?: "octahedron" | "icosahedron" | "torus"
}) {
  return <SectionDivider3D variant={variant} />
}
