"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface LyricLine {
  time: number
  text: string
}

interface LyricsPanelProps {
  currentTime: number
  isPlaying: boolean
}

export const LyricsPanel = ({ currentTime, isPlaying }: LyricsPanelProps) => {
  const [activeLine, setActiveLine] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sample lyrics with timestamps
  const lyrics: LyricLine[] = [
    { time: 0, text: "Neon lights flicker in the digital rain" },
    { time: 12, text: "Holographic memories fade away again" },
    { time: 24, text: "Lost in the static of a cybernetic dream" },
    { time: 36, text: "Reality blurs at the edges of the stream" },
    { time: 48, text: "Quantum signals echo through the night" },
    { time: 60, text: "Binary whispers just beyond my sight" },
    { time: 72, text: "Synthetic emotions programmed to feel" },
    { time: 84, text: "Can't distinguish what's false from what's real" },
    { time: 96, text: "Neon dreams in a digital sky" },
    { time: 108, text: "Virtual worlds where we learn to fly" },
    { time: 120, text: "Coded existence in a simulated space" },
    { time: 132, text: "Transcending the limits of time and place" },
    { time: 144, text: "Cybernetic pulse, electronic beat" },
    { time: 156, text: "Rhythm of the future beneath our feet" },
    { time: 168, text: "Dancing through data in streams of light" },
    { time: 180, text: "Glowing forever in the endless night" },
    { time: 192, text: "Neon dreams..." },
    { time: 204, text: "Digital horizons..." },
  ]

  // Update active line based on current time
  useEffect(() => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        if (activeLine !== i) {
          setActiveLine(i)

          // Scroll to active line
          if (containerRef.current) {
            const lineElement = containerRef.current.querySelector(`[data-line="${i}"]`)
            if (lineElement) {
              lineElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          }
        }
        break
      }
    }
  }, [currentTime, activeLine, lyrics])

  return (
    <div ref={containerRef} className="h-full overflow-y-auto py-8 px-4 bg-gradient-to-b from-black to-purple-900/20">
      <div className="max-w-md mx-auto space-y-6">
        {lyrics.map((line, index) => (
          <motion.div
            key={index}
            data-line={index}
            initial={{ opacity: 0.5, y: 20 }}
            animate={{
              opacity: index === activeLine ? 1 : 0.5,
              y: 0,
              scale: index === activeLine ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`text-center py-2 px-4 rounded-lg transition-all ${
              index === activeLine
                ? "text-cyan-300 font-semibold text-xl bg-purple-900/20 border border-cyan-500/30"
                : "text-purple-300 text-lg"
            }`}
          >
            {line.text}

            {/* Animated underline for active line */}
            {index === activeLine && isPlaying && (
              <motion.div
                className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 mt-1 mx-auto"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: index < lyrics.length - 1 ? lyrics[index + 1].time - lyrics[index].time : 12,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
