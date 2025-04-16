"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface BackgroundParticlesProps {
  isPlaying: boolean
}

export const BackgroundParticles = ({ isPlaying }: BackgroundParticlesProps) => {
  const particlesRef = useRef<THREE.Points>(null)

  // Create particles
  const particles = useMemo(() => {
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Position
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 50
      positions[i3 + 1] = (Math.random() - 0.5) * 50
      positions[i3 + 2] = (Math.random() - 0.5) * 50

      // Color - cyberpunk palette
      const colorChoice = Math.random()
      const color = new THREE.Color()

      if (colorChoice < 0.33) {
        // Purple to pink
        color.setHSL(0.8, 0.8, 0.5 + Math.random() * 0.2)
      } else if (colorChoice < 0.66) {
        // Cyan to blue
        color.setHSL(0.5, 0.8, 0.5 + Math.random() * 0.2)
      } else {
        // Pink to red
        color.setHSL(0.95, 0.8, 0.5 + Math.random() * 0.2)
      }

      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      // Size
      sizes[i] = Math.random() * 0.15 + 0.05
    }

    return { positions, colors, sizes }
  }, [])

  // Animation
  useFrame((state, delta) => {
    if (particlesRef.current) {
      // Rotate particles
      particlesRef.current.rotation.y += delta * 0.03
      particlesRef.current.rotation.x += delta * 0.01

      // Update particle positions based on music playing state
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const sizes = particlesRef.current.geometry.attributes.size.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        // Add pulsing effect when music is playing
        if (isPlaying) {
          const time = state.clock.elapsedTime
          const idx = i / 3

          // Create wave-like movement
          const amplitude = 0.05
          const frequency = 0.5
          const phase = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2) * 0.1

          const wave = Math.sin(time * frequency + phase) * amplitude

          // Pulse size with music
          sizes[idx] = (Math.sin(time * 2 + idx) * 0.05 + 0.1) * (1 + wave)

          // Apply subtle movement
          const distance = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2)

          if (distance > 0.1) {
            const dirX = positions[i] / distance
            const dirY = positions[i + 1] / distance
            const dirZ = positions[i + 2] / distance

            positions[i] += dirX * wave * 0.2
            positions[i + 1] += dirY * wave * 0.2
            positions[i + 2] += dirZ * wave * 0.2
          }
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.geometry.attributes.size.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-size" count={particles.sizes.length} array={particles.sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      >
        <texture attach="map" url="/placeholder.svg?height=64&width=64" crossOrigin="anonymous" />
      </pointsMaterial>
    </points>
  )
}
