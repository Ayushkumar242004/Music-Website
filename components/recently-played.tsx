"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Play, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export const RecentlyPlayed = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const recentSongs = [
    { id: 1, title: "Cyber Dreams", artist: "Neon Pulse", time: "2 hours ago", duration: "3:42" },
    { id: 2, title: "Digital Horizon", artist: "Synthwave Riders", time: "Yesterday", duration: "4:15" },
    { id: 3, title: "Neon City Lights", artist: "Cyber Collective", time: "Yesterday", duration: "3:28" },
    { id: 4, title: "Midnight Protocol", artist: "Data Drift", time: "2 days ago", duration: "5:03" },
    { id: 5, title: "Electric Soul", artist: "Virtual Echo", time: "3 days ago", duration: "3:57" },
    { id: 6, title: "Binary Sunset", artist: "Digital Dreams", time: "4 days ago", duration: "4:22" },
    { id: 7, title: "Quantum Flux", artist: "Binary Ghosts", time: "5 days ago", duration: "4:32" },
    { id: 8, title: "Holographic Heart", artist: "Neon Angels", time: "6 days ago", duration: "3:45" },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      const scrollAmount = direction === "left" ? -300 : 300
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      {!isMobile && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-black/70 border-purple-900/50 text-purple-300 hover:text-pink-300 hover:border-pink-500/50 hover:bg-black/90"
            onClick={() => scroll("left")}
          >
            &lt;
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-black/70 border-purple-900/50 text-purple-300 hover:text-pink-300 hover:border-pink-500/50 hover:bg-black/90"
            onClick={() => scroll("right")}
          >
            &gt;
          </Button>
        </>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent pb-4 -mx-2 px-2"
        style={{ scrollbarWidth: "thin" }}
      >
        {recentSongs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex-shrink-0 w-60 mr-4 group"
          >
            <div className="relative bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-900/30 group-hover:border-pink-500/50 transition-colors">
              <div className="relative h-32">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-pink-900/70"></div>
                <img
                  src="/placeholder.svg?height=128&width=240"
                  alt={song.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-500 hover:via-pink-400 hover:to-cyan-400"
                  >
                    <Play size={24} className="ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                  <Clock size={10} />
                  <span>{song.duration}</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-white font-medium truncate">{song.title}</h3>
                <p className="text-purple-300 text-sm truncate">{song.artist}</p>
                <p className="text-purple-400 text-xs mt-1">{song.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
