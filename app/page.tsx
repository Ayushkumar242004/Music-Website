"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import {
  Search,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Volume2,
  Heart,
  Download,
  Mic2,
  Share2,
  Music,
  Globe,
  LogIn,
  UserPlus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FeaturedPlaylists } from "@/components/featured-playlists"
import { BackgroundParticles } from "@/components/background-particles"
import { TrendingSongs } from "@/components/trending-songs"
import { RecentlyPlayed } from "@/components/recently-played"
import { FollowedArtists } from "@/components/followed-artists"
import { SearchResults } from "@/components/search-results"
import { LoginModal } from "@/components/login-modal"
import { SignupModal } from "@/components/signup-modal"
import { useMobile } from "@/hooks/use-mobile"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(237) // 3:57 in seconds
  const [volume, setVolume] = useState(80)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMobile()

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSearchResults(true)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchResults(false)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white overflow-hidden">
      {/* Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <BackgroundParticles isPlaying={isPlaying} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Navigation */}
        <div className="flex justify-between items-center p-4 bg-black/30 backdrop-blur-md border-b border-purple-900/30">
          {/* Logo */}
          <div className="hidden md:flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              NEON PULSE
            </div>
            <Badge variant="outline" className="bg-purple-900/30 text-pink-300 border-pink-500/50">
              BETA
            </Badge>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-md w-full mx-auto md:mx-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-md blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-md overflow-hidden">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for songs, artists, albums..."
                  className="border-0 bg-transparent text-white placeholder:text-gray-400 pl-10 pr-10 py-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={clearSearch}
                  >
                    ×
                  </Button>
                )}
              </div>
            </div>
          </form>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-pink-500/50 bg-black/50 text-pink-300 hover:bg-pink-950/30 hover:text-pink-200"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <LogIn size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Log In</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-500 hover:via-pink-400 hover:to-cyan-400 text-white"
                    onClick={() => setShowSignupModal(true)}
                  >
                    <UserPlus size={18} className="mr-2" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Create Account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <div className="hidden md:flex flex-col w-64 bg-black/40 backdrop-blur-md border-r border-purple-900/30 p-4">
            {/* Language Selector */}
            <div className="mb-6">
              <Button
                variant="outline"
                className="w-full border-purple-900/50 bg-black/50 text-purple-300 hover:bg-purple-950/30 hover:text-purple-200"
              >
                <Globe size={16} className="mr-2" />
                English
              </Button>
            </div>

            {/* Navigation */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Library</h3>

              <NavItem icon={<Heart size={20} />} label="Liked Songs" count={42} />
              <NavItem icon={<Music size={20} />} label="My Playlists" count={12} />
              <NavItem icon={<Download size={20} />} label="Downloads" count={18} />
            </div>

            {/* Playlists */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">My Playlists</h3>

              <div className="space-y-1">
                <PlaylistItem name="Cyberpunk Essentials" tracks={24} />
                <PlaylistItem name="Synthwave Nights" tracks={18} />
                <PlaylistItem name="Neon Dreams" tracks={32} />
                <PlaylistItem name="Digital Horizon" tracks={15} />
                <PlaylistItem name="Retro Future" tracks={27} />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
            <AnimatePresence mode="wait">
              {showSearchResults ? (
                <motion.div
                  key="search-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 md:p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Results for "{searchQuery}"</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-900/50 bg-black/50 text-purple-300 hover:bg-purple-950/30 hover:text-purple-200"
                      onClick={clearSearch}
                    >
                      Clear Search
                    </Button>
                  </div>
                  <SearchResults query={searchQuery} />
                </motion.div>
              ) : (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className="flex-1 min-w-0">
                      {/* Trending Songs */}
                      <section className="mb-8 w-full">
                        <h2 className="text-2xl font-bold text-white mb-4">Trending Now</h2>
                        <div className="w-full overflow-x-hidden">
                          <TrendingSongs isPlaying={isPlaying} />
                        </div>
                      </section>

                      {/* Recently Played */}
                      <section className="mb-8 w-full">
                        <h2 className="text-2xl font-bold text-white mb-4">Recently Played</h2>
                        <div className="w-full overflow-x-hidden">
                          <RecentlyPlayed />
                        </div>
                      </section>

                      <FeaturedPlaylists />

                      {/* Genres */}
                      <section className="mb-8 w-full">
                        <h2 className="text-2xl font-bold text-white mb-4">Explore Genres</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                          {[
                            "Synthwave",
                            "Cyberpunk",
                            "Darksynth",
                            "Retrowave",
                            "Vaporwave",
                            "Chillwave",
                            "Outrun",
                            "Electro",
                          ].map((genre) => (
                            <GenreCard key={genre} name={genre} />
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Right Panel - Followed Artists */}
                    {!isMobile && (
                      <div className="w-72 shrink-0">
                        <h2 className="text-2xl font-bold text-white mb-4">Followed Artists</h2>
                        <div className="w-full">
                          <FollowedArtists />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Player Controls */}
        <div className="sticky bottom-0 left-0 right-0 bg-black/70 backdrop-blur-xl border-t border-purple-900/30 p-3">
          <div className="flex items-center gap-4">
            {/* Current Song Info */}
            <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
              <div className="relative w-12 h-12 rounded overflow-hidden border border-purple-900/50 group">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="Current track"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={16} className="text-pink-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white truncate">Neon Dystopia</h3>
                <p className="text-xs text-purple-300 truncate">Cyber Collective</p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
                >
                  <Shuffle size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
                >
                  <SkipBack size={20} />
                </Button>
                <Button
                  onClick={togglePlay}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-500 hover:via-pink-400 hover:to-cyan-400 flex items-center justify-center"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
                >
                  <SkipForward size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
                >
                  <Repeat size={18} />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="w-full flex items-center gap-2">
                <span className="text-xs text-purple-300 w-10 text-right">{formatTime(currentTime)}</span>
                <div className="relative flex-1 h-1 bg-purple-900/30 rounded-full overflow-hidden group">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                  <div
                    className="absolute top-1/2 h-3 w-3 rounded-full bg-white -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-purple-300 w-10">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Controls */}
            <div className="hidden md:flex items-center gap-2 w-1/6">
              <Volume2 size={16} className="text-purple-300" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="w-24"
              />
            </div>

            {/* Extra Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
              >
                <Mic2 size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
              >
                <Share2 size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onSignupClick={() => {
              setShowLoginModal(false)
              setShowSignupModal(true)
            }}
          />
        )}

        {showSignupModal && (
          <SignupModal
            onClose={() => setShowSignupModal(false)}
            onLoginClick={() => {
              setShowSignupModal(false)
              setShowLoginModal(true)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Navigation Item Component
const NavItem = ({ icon, label, count }: { icon: React.ReactNode; label: string; count: number }) => {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start px-3 py-6 text-purple-300 hover:text-pink-300 hover:bg-purple-900/30 group relative overflow-hidden"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/0 via-purple-900/0 to-purple-900/0 group-hover:from-purple-900/10 group-hover:via-pink-900/10 group-hover:to-purple-900/0 transition-colors"></div>
      <span className="mr-3 text-pink-500 group-hover:text-pink-400">{icon}</span>
      <span className="flex-1">{label}</span>
      <Badge
        variant="outline"
        className="bg-purple-900/30 text-purple-300 border-purple-500/50 group-hover:border-pink-500/50 group-hover:text-pink-300"
      >
        {count}
      </Badge>
    </Button>
  )
}

// Playlist Item Component
const PlaylistItem = ({ name, tracks }: { name: string; tracks: number }) => {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start px-3 py-2 text-purple-300 hover:text-pink-300 hover:bg-purple-900/30 group"
    >
      <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-pink-500 mr-3 flex items-center justify-center text-xs font-bold">
        {name.substring(0, 1)}
      </div>
      <span className="flex-1 truncate">{name}</span>
      <span className="text-xs text-purple-400 group-hover:text-pink-300">{tracks} tracks</span>
    </Button>
  )
}

// Genre Card Component
const GenreCard = ({ name }: { name: string }) => {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -5 }} className="relative overflow-hidden rounded-lg aspect-square">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 opacity-70"></div>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>
      </div>
      <div className="absolute inset-0 border-2 border-transparent hover:border-pink-500 transition-colors rounded-lg"></div>
    </motion.div>
  )
}