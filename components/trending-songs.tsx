"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera, Text } from "@react-three/drei"
import * as THREE from "three"
import { Play, Heart, Plus, Clock, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Song3DCardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  title: string
  artist: string
  image: string
  isPlaying: boolean
  index: number
}

const Song3DCard = ({ position, rotation, title, artist, image, isPlaying, index }: Song3DCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [localPlaying, setLocalPlaying] = useState(false)

  // Create texture
  const texture = new THREE.TextureLoader().load(image)
  texture.colorSpace = THREE.SRGBColorSpace

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setLocalPlaying(!localPlaying)}
        scale={hovered ? 1.05 : 1}
      >
        <boxGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color(localPlaying ? 0xff1493 : hovered ? 0x9333ea : 0x000000)}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Glow effect */}
      <mesh position={[0, 0, -0.06]} scale={1.1}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial
          color={localPlaying ? new THREE.Color(0xff1493) : new THREE.Color(0x9333ea)}
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Title and artist */}
      {hovered && (
        <>
          <Text
            position={[0, -1.2, 0.2]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Bold.json"
          >
            {title}
          </Text>
          <Text
            position={[0, -1.5, 0.2]}
            fontSize={0.12}
            color="#ff79c6"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Regular.json"
          >
            {artist}
          </Text>
        </>
      )}

      {/* Play indicator */}
      {localPlaying && (
        <mesh position={[0, 0, 0.2]}>
          <circleGeometry args={[0.4, 32]} />
          <meshBasicMaterial color={new THREE.Color(0x000000)} transparent opacity={0.7} />
        </mesh>
      )}

      {localPlaying && (
        <mesh position={[0, 0, 0.3]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color={new THREE.Color(0xffffff)} />
        </mesh>
      )}
    </group>
  )
}

interface TrendingSongsProps {
  isPlaying: boolean
}

export const TrendingSongs = ({ isPlaying }: TrendingSongsProps) => {
  const songs = [
    { id: 1, title: "Neon Dystopia", artist: "Cyber Collective", duration: "3:45", plays: "1.2M" },
    { id: 2, title: "Digital Dreams", artist: "Synthwave Riders", duration: "4:12", plays: "856K" },
    { id: 3, title: "Electric Soul", artist: "Neon Pulse", duration: "3:28", plays: "2.1M" },
    { id: 4, title: "Midnight Protocol", artist: "Data Drift", duration: "5:03", plays: "643K" },
    { id: 5, title: "Holographic Heart", artist: "Virtual Echo", duration: "3:57", plays: "1.5M" },
    { id: 6, title: "Quantum Flux", artist: "Binary Ghosts", duration: "4:32", plays: "921K" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song, index) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative bg-black/80 backdrop-blur-md rounded-xl overflow-hidden border border-purple-900/50 group-hover:border-pink-500/50 transition-colors">
            <div className="h-48 relative">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
                <Song3DCard
                  position={[0, 0, 0]}
                  rotation={[0, 0, 0]}
                  title={song.title}
                  artist={song.artist}
                  image="/placeholder.svg?height=256&width=256"
                  isPlaying={isPlaying}
                  index={index}
                />
                <Environment preset="night" />
              </Canvas>

              <div className="absolute bottom-2 right-2 z-10">
                <Badge className="bg-black/70 text-pink-300 border-pink-500/50">Trending #{index + 1}</Badge>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-white font-medium truncate">{song.title}</h3>
              <p className="text-purple-300 text-sm truncate">{song.artist}</p>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 text-xs text-purple-300">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{song.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Headphones size={12} />
                    <span>{song.plays}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
                  >
                    <Heart size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
                  >
                    <Plus size={16} />
                  </Button>
                  <Button className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-500 hover:via-pink-400 hover:to-cyan-400">
                    <Play size={14} className="ml-0.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
