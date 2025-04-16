"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Plus, Clock, Music, Users, Sparkles, Heart } from "lucide-react"

export const PlaylistSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All" },
    { id: "personal", label: "Personal" },
    { id: "shared", label: "Shared" },
    { id: "ai", label: "AI Generated" },
  ]

  const playlists = [
    {
      id: 1,
      title: "Cyberpunk Essentials",
      description: "Your favorite cyberpunk tracks",
      image: "/placeholder.svg?height=80&width=80",
      tracks: 42,
      duration: "3h 15m",
      category: "personal",
      liked: true,
    },
    {
      id: 2,
      title: "Synthwave Nights",
      description: "Perfect for late night coding",
      image: "/placeholder.svg?height=80&width=80",
      tracks: 28,
      duration: "2h 10m",
      category: "personal",
      liked: false,
    },
    {
      id: 3,
      title: "Hacker Collective",
      description: "Shared with Cyber Crew",
      image: "/placeholder.svg?height=80&width=80",
      tracks: 35,
      duration: "2h 45m",
      category: "shared",
      collaborators: 4,
      liked: true,
    },
    {
      id: 4,
      title: "Neural Beats",
      description: "Generated based on your taste",
      image: "/placeholder.svg?height=80&width=80",
      tracks: 20,
      duration: "1h 30m",
      category: "ai",
      confidence: 95,
      liked: false,
    },
  ]

  const filteredPlaylists =
    selectedCategory === "all" ? playlists : playlists.filter((playlist) => playlist.category === selectedCategory)

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={
              selectedCategory === category.id
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white"
                : "border-purple-900/50 text-purple-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-purple-900/30"
            }
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Playlists */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-4"
        >
          {filteredPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="bg-black/50 border-purple-900/30 hover:border-cyan-500/50 transition-all overflow-hidden"
            >
              <div className="flex">
                <div className="relative w-24 h-24 border-r border-purple-900/30">
                  <img
                    src={playlist.image || "/placeholder.svg"}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="icon" className="h-10 w-10 rounded-full bg-cyan-500 hover:bg-cyan-400">
                      <Play size={20} className="ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1">
                  <CardHeader className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{playlist.title}</CardTitle>
                        <CardDescription className="text-purple-300">{playlist.description}</CardDescription>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className={
                          playlist.liked
                            ? "text-pink-500 hover:text-pink-400 hover:bg-pink-900/20"
                            : "text-purple-300 hover:text-pink-400 hover:bg-purple-900/30"
                        }
                      >
                        <Heart size={18} fill={playlist.liked ? "currentColor" : "none"} />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-3 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-purple-300">
                        <div className="flex items-center gap-1">
                          <Music size={14} />
                          <span>{playlist.tracks} tracks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{playlist.duration}</span>
                        </div>

                        {playlist.category === "shared" && (
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{playlist.collaborators} collaborators</span>
                          </div>
                        )}

                        {playlist.category === "ai" && (
                          <div className="flex items-center gap-1">
                            <Sparkles size={14} />
                            <span>{playlist.confidence}% match</span>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-purple-900/50 text-purple-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-purple-900/30"
                      >
                        <Plus size={14} className="mr-1" /> Add
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
