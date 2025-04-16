// components/featured-playlists.tsx
'use client'

import { motion } from 'framer-motion'
import { Disc3, Headphones, Radio, Sparkles } from 'lucide-react'

const playlistData = [
  {
    id: 1,
    title: "Neon Nights",
    creator: "SynthWave Radio",
    tracks: 24,
    color: "from-purple-600 to-pink-500",
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Cyber Dreams",
    creator: "AI Beats",
    tracks: 18,
    color: "from-cyan-500 to-blue-600",
    icon: <Headphones className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Retro Future",
    creator: "80s Rewind",
    tracks: 32,
    color: "from-orange-500 to-amber-600",
    icon: <Radio className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Digital Horizon",
    creator: "Vector Waves",
    tracks: 15,
    color: "from-emerald-500 to-teal-600",
    icon: <Disc3 className="w-5 h-5" />
  }
]

export function FeaturedPlaylists() {
  return (
    <section className="mb-8 w-full">
      <h2 className="text-2xl font-bold text-white mb-4">Featured Playlists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {playlistData.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{
              y: -5,
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
            }}
            className="relative group overflow-hidden rounded-lg border border-purple-900/50 bg-gradient-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-sm"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            
            <div className="relative p-4 h-full flex flex-col">
              <div className="mb-3 flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center text-purple-300">
                  {playlist.icon}
                </div>
                <span className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded-full">
                  {playlist.tracks} tracks
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {playlist.title}
              </h3>
              <p className="text-sm text-purple-200/80">{playlist.creator}</p>
              
              <motion.div 
                className="mt-4 pt-4 border-t border-purple-900/30 flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button className="text-xs text-white bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-1 rounded-full hover:from-purple-500 hover:to-pink-400 transition-all">
                  Play All
                </button>
                <span className="text-xs text-purple-300/60 group-hover:text-purple-300 transition-colors">
                  Updated today
                </span>
              </motion.div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/30 transition-all pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}