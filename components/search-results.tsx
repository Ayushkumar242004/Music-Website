"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Heart, Plus, Clock, Headphones, Music, User, Album } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface SearchResultsProps {
  query: string
}

export const SearchResults = ({ query }: SearchResultsProps) => {
  const [activeTab, setActiveTab] = useState("all")

  // Generate dummy search results based on the query
  const songs = [
    { id: 1, title: `${query} Dreams`, artist: "Cyber Collective", duration: "3:45", plays: "1.2M" },
    { id: 2, title: `Digital ${query}`, artist: "Synthwave Riders", duration: "4:12", plays: "856K" },
    { id: 3, title: `Electric ${query}`, artist: "Neon Pulse", duration: "3:28", plays: "2.1M" },
    { id: 4, title: `${query} Protocol`, artist: "Data Drift", duration: "5:03", plays: "643K" },
  ]

  const artists = [
    { id: 1, name: `${query} Collective`, image: "/placeholder.svg?height=64&width=64", followers: "1.2M" },
    { id: 2, name: `${query} Riders`, image: "/placeholder.svg?height=64&width=64", followers: "856K" },
    { id: 3, name: `Neon ${query}`, image: "/placeholder.svg?height=64&width=64", followers: "2.1M" },
  ]

  const albums = [
    { id: 1, title: `${query} Dreams`, artist: "Cyber Collective", year: "2023", tracks: 12 },
    { id: 2, title: `Digital ${query}`, artist: "Synthwave Riders", year: "2022", tracks: 10 },
    { id: 3, title: `Electric ${query}`, artist: "Neon Pulse", year: "2024", tracks: 8 },
  ]

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-black/50 border border-purple-900/30">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="artists"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            Artists
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-8">
          {/* Songs Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Music size={20} className="text-pink-500" />
                Songs
              </h2>
              <Button
                variant="link"
                className="text-purple-300 hover:text-pink-300"
                onClick={() => setActiveTab("songs")}
              >
                View All
              </Button>
            </div>
            <SongResults songs={songs.slice(0, 3)} />
          </div>

          {/* Artists Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User size={20} className="text-pink-500" />
                Artists
              </h2>
              <Button
                variant="link"
                className="text-purple-300 hover:text-pink-300"
                onClick={() => setActiveTab("artists")}
              >
                View All
              </Button>
            </div>
            <ArtistResults artists={artists.slice(0, 3)} />
          </div>

          {/* Albums Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Album size={20} className="text-pink-500" />
                Albums
              </h2>
              <Button
                variant="link"
                className="text-purple-300 hover:text-pink-300"
                onClick={() => setActiveTab("albums")}
              >
                View All
              </Button>
            </div>
            <AlbumResults albums={albums.slice(0, 3)} />
          </div>
        </TabsContent>

        <TabsContent value="songs" className="mt-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Music size={20} className="text-pink-500" />
            Songs
          </h2>
          <SongResults songs={songs} />
        </TabsContent>

        <TabsContent value="artists" className="mt-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <User size={20} className="text-pink-500" />
            Artists
          </h2>
          <ArtistResults artists={artists} />
        </TabsContent>

        <TabsContent value="albums" className="mt-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Album size={20} className="text-pink-500" />
            Albums
          </h2>
          <AlbumResults albums={albums} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const SongResults = ({ songs }: { songs: any[] }) => {
  return (
    <div className="space-y-2">
      {songs.map((song, index) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className="group relative bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-900/30 hover:border-pink-500/50 transition-colors p-3"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded overflow-hidden border border-purple-900/50 group-hover:border-pink-500/50 transition-colors">
              <img src="/placeholder.svg?height=48&width=48" alt={song.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-500 hover:via-pink-400 hover:to-cyan-400"
                >
                  <Play size={14} className="ml-0.5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{song.title}</h3>
              <p className="text-purple-300 text-sm truncate">{song.artist}</p>
            </div>

            <div className="flex items-center gap-3 text-xs text-purple-300">
              <div className="hidden sm:flex items-center gap-1">
                <Clock size={12} />
                <span>{song.duration}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <Headphones size={12} />
                <span>{song.plays}</span>
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
        </motion.div>
      ))}
    </div>
  )
}

const ArtistResults = ({ artists }: { artists: any[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {artists.map((artist, index) => (
        <motion.div
          key={artist.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className="group relative bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-900/30 hover:border-pink-500/50 transition-colors p-4"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 blur opacity-0 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <Avatar className="h-24 w-24 border-2 border-purple-900/50 group-hover:border-pink-500/50 transition-colors">
                <AvatarImage src={artist.image || "/placeholder.svg"} />
                <AvatarFallback className="bg-purple-900 text-white text-xl">
                  {artist.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>

            <h3 className="text-white font-medium text-lg mb-1">{artist.name}</h3>
            <p className="text-purple-300 text-sm flex items-center justify-center gap-1 mb-3">
              <Music size={12} />
              <span>{artist.followers} followers</span>
            </p>

            <Button className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-500 hover:via-pink-400 hover:to-cyan-400 text-white">
              Follow
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const AlbumResults = ({ albums }: { albums: any[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {albums.map((album, index) => (
        <motion.div
          key={album.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          whileHover={{ y: -5 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative bg-black/80 backdrop-blur-md rounded-xl overflow-hidden border border-purple-900/50 group-hover:border-pink-500/50 transition-colors">
            <div className="relative h-40">
              <img
                src="/placeholder.svg?height=160&width=320"
                alt={album.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <Badge className="bg-black/70 text-pink-300 border-pink-500/50">{album.year}</Badge>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-500 hover:via-pink-400 hover:to-cyan-400"
                >
                  <Play size={24} className="ml-1" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-white font-medium truncate">{album.title}</h3>
              <p className="text-purple-300 text-sm truncate">{album.artist}</p>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1 text-xs text-purple-300">
                  <Music size={12} />
                  <span>{album.tracks} tracks</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-purple-900/50 text-purple-300 hover:text-pink-300 hover:border-pink-500/50 hover:bg-purple-900/30"
                >
                  <Plus size={14} className="mr-1" /> Add
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
