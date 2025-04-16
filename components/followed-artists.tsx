"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Music, Radio } from "lucide-react"

export const FollowedArtists = () => {
  const artists = [
    {
      id: 1,
      name: "Cyber Collective",
      image: "/placeholder.svg?height=64&width=64",
      followers: "1.2M",
      isLive: true,
      newRelease: false,
    },
    {
      id: 2,
      name: "Synthwave Riders",
      image: "/placeholder.svg?height=64&width=64",
      followers: "856K",
      isLive: false,
      newRelease: true,
    },
    {
      id: 3,
      name: "Neon Pulse",
      image: "/placeholder.svg?height=64&width=64",
      followers: "2.1M",
      isLive: false,
      newRelease: false,
    },
    {
      id: 4,
      name: "Data Drift",
      image: "/placeholder.svg?height=64&width=64",
      followers: "643K",
      isLive: false,
      newRelease: true,
    },
    {
      id: 5,
      name: "Virtual Echo",
      image: "/placeholder.svg?height=64&width=64",
      followers: "1.5M",
      isLive: true,
      newRelease: false,
    },
    {
      id: 6,
      name: "Binary Ghosts",
      image: "/placeholder.svg?height=64&width=64",
      followers: "921K",
      isLive: false,
      newRelease: false,
    },
  ]

  return (
    <div className="space-y-4 bg-black/40 backdrop-blur-md rounded-xl p-4 border border-purple-900/30">
      {artists.map((artist, index) => (
        <motion.div
          key={artist.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-full ${artist.isLive || artist.newRelease ? "animate-pulse" : ""}`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 blur opacity-70"></div>
            </div>
            <Avatar className="h-12 w-12 border-2 border-transparent group-hover:border-pink-500 transition-colors relative">
              <AvatarImage src={artist.image || "/placeholder.svg"} />
              <AvatarFallback className="bg-purple-900 text-white">{artist.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            {artist.isLive && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white border-0 px-1.5 py-0 text-[10px]">
                LIVE
              </Badge>
            )}
            {artist.newRelease && !artist.isLive && (
              <Badge className="absolute -top-1 -right-1 bg-cyan-500 text-white border-0 px-1.5 py-0 text-[10px]">
                NEW
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{artist.name}</h3>
            <p className="text-purple-300 text-xs flex items-center gap-1">
              <Music size={10} />
              <span>{artist.followers} followers</span>
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
          >
            <Radio size={16} />
          </Button>
        </motion.div>
      ))}

      <Button
        variant="outline"
        className="w-full mt-4 border-purple-900/50 bg-black/50 text-purple-300 hover:bg-purple-950/30 hover:text-pink-300 hover:border-pink-500/50"
      >
        View All Artists
      </Button>
    </div>
  )
}
