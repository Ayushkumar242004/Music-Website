"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Plus, Sparkles, Headphones, Clock, Calendar } from "lucide-react"

export const RecommendationPanel = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const recommendations = [
    {
      id: 1,
      title: "Daily Mix 1",
      description: "Based on your recent listening",
      image: "/placeholder.svg?height=80&width=80",
      tags: ["Synthwave", "Cyberpunk"],
      tracks: 15,
      duration: "1h 12m",
      lastUpdated: "Today",
    },
    {
      id: 2,
      title: "Discover Weekly",
      description: "New discoveries and deep cuts",
      image: "/placeholder.svg?height=80&width=80",
      tags: ["Electronic", "Ambient"],
      tracks: 30,
      duration: "2h 45m",
      lastUpdated: "Monday",
    },
    {
      id: 3,
      title: "Release Radar",
      description: "New releases from artists you follow",
      image: "/placeholder.svg?height=80&width=80",
      tags: ["New Releases", "Favorites"],
      tracks: 20,
      duration: "1h 30m",
      lastUpdated: "Friday",
    },
  ]

  const aiRecommendations = [
    {
      id: 4,
      title: "Mood Booster",
      description: "AI-curated tracks to elevate your mood",
      image: "/placeholder.svg?height=64&width=64",
      avatar: "/placeholder.svg?height=40&width=40",
      avatarFallback: "AI",
      confidence: 92,
    },
    {
      id: 5,
      title: "Focus Flow",
      description: "Perfect for deep work sessions",
      image: "/placeholder.svg?height=64&width=64",
      avatar: "/placeholder.svg?height=40&width=40",
      avatarFallback: "AI",
      confidence: 87,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
          <Sparkles size={18} className="text-purple-400" />
          For You
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: item.id * 0.1 }}
              onHoverStart={() => setHoveredCard(item.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="bg-black/50 border-purple-900/30 hover:border-cyan-500/50 transition-all overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start gap-3">
                    <div className="relative w-20 h-20 rounded overflow-hidden border border-purple-900/30">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      {hoveredCard === item.id && (
                        <motion.div
                          className="absolute inset-0 bg-black/60 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button size="icon" className="h-10 w-10 rounded-full bg-cyan-500 hover:bg-cyan-400">
                            <Play size={20} className="ml-1" />
                          </Button>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex-1">
                      <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-purple-300">{item.description}</CardDescription>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-purple-900/30 text-cyan-300 border-cyan-500/50"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardFooter className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-purple-300">
                    <div className="flex items-center gap-1">
                      <Headphones size={14} />
                      <span>{item.tracks} tracks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{item.lastUpdated}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-purple-300 hover:text-cyan-300 hover:bg-purple-900/30"
                  >
                    <Plus size={18} />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-400" />
          AI Recommendations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiRecommendations.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (item.id - 3) * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-black border-purple-900/30 hover:border-cyan-500/50 transition-all h-full">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Avatar className="h-8 w-8 border border-cyan-500/50">
                      <AvatarImage src={item.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-cyan-900/50 text-cyan-300">{item.avatarFallback}</AvatarFallback>
                    </Avatar>

                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/50">{item.confidence}% Match</Badge>
                  </div>

                  <CardTitle className="text-white">{item.title}</CardTitle>
                  <CardDescription className="text-purple-300">{item.description}</CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white">
                      <Play size={16} className="mr-2" /> Play Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-900/50 text-purple-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-purple-900/30"
                    >
                      <Plus size={16} className="mr-2" /> Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
