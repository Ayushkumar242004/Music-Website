"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture, Text } from "@react-three/drei"
import * as THREE from "three"

interface AlbumProps {
  position: [number, number, number]
  rotation: [number, number, number]
  texture: THREE.Texture
  title: string
  artist: string
  isActive?: boolean
  onClick?: () => void
}

const Album = ({ position, rotation, texture, title, artist, isActive = false, onClick }: AlbumProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.0005

      // Rotation animation when hovered or active
      if (hovered || isActive) {
        meshRef.current.rotation.y += delta * 0.5
      }
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        scale={isActive ? 1.1 : 1}
      >
        <boxGeometry args={[3, 3, 0.2]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color(isActive ? 0x9333ea : hovered ? 0x67e8f9 : 0x000000)}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Album info */}
      {(hovered || isActive) && (
        <>
          <Text
            position={[0, -1.8, 0.2]}
            fontSize={0.25}
            color={isActive ? "#67e8f9" : "#ffffff"}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Bold.json"
          >
            {title}
          </Text>
          <Text
            position={[0, -2.2, 0.2]}
            fontSize={0.18}
            color="#a78bfa"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Regular.json"
          >
            {artist}
          </Text>
        </>
      )}

      {/* Glow effect for active album */}
      {isActive && (
        <mesh position={[0, 0, -0.15]}>
          <planeGeometry args={[3.5, 3.5]} />
          <meshBasicMaterial color={new THREE.Color(0x9333ea)} transparent={true} opacity={0.3} />
        </mesh>
      )}
    </group>
  )
}

interface AlbumCarouselProps {
  isPlaying: boolean
}

export const AlbumCarousel = ({ isPlaying }: AlbumCarouselProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [albums, setAlbums] = useState<{ title: string; artist: string; texture: THREE.Texture | null }[]>([])

  // Load textures
  const texture1 = useTexture("/placeholder.svg?height=512&width=512")
  const texture2 = useTexture("/placeholder.svg?height=512&width=512")
  const texture3 = useTexture("/placeholder.svg?height=512&width=512")
  const texture4 = useTexture("/placeholder.svg?height=512&width=512")
  const texture5 = useTexture("/placeholder.svg?height=512&width=512")

  useEffect(() => {
    // Initialize albums with textures
    setAlbums([
      { title: "Neon Dreams", artist: "Cyber Collective", texture: texture1 },
      { title: "Digital Horizon", artist: "Synthwave Riders", texture: texture2 },
      { title: "Quantum Pulse", artist: "Neural Network", texture: texture3 },
      { title: "Holographic Memories", artist: "Virtual Echo", texture: texture4 },
      { title: "Cybernetic Soul", artist: "Artificial Harmony", texture: texture5 },
    ])
  }, [texture1, texture2, texture3, texture4, texture5])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate the entire carousel slowly
      if (isPlaying) {
        groupRef.current.rotation.y += delta * 0.1
      }
    }
  })

  const getPositionForIndex = (index: number, totalAlbums: number): [number, number, number] => {
    const angle = (index / totalAlbums) * Math.PI * 2
    const radius = 6
    return [Math.sin(angle) * radius, 0, Math.cos(angle) * radius]
  }

  const getRotationForIndex = (index: number, totalAlbums: number): [number, number, number] => {
    const angle = (index / totalAlbums) * Math.PI * 2
    return [0, -angle + Math.PI, 0]
  }

  return (
    <group ref={groupRef}>
      {albums.map(
        (album, index) =>
          album.texture && (
            <Album
              key={index}
              position={getPositionForIndex(index, albums.length)}
              rotation={getRotationForIndex(index, albums.length)}
              texture={album.texture}
              title={album.title}
              artist={album.artist}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ),
      )}
    </group>
  )
}
