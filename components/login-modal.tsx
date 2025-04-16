"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface LoginModalProps {
  onClose: () => void
  onSignupClick: () => void
}

export const LoginModal = ({ onClose, onSignupClick }: LoginModalProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, rememberMe })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-xl blur opacity-70"></div>

          {/* Content */}
          <div className="relative bg-black/90 backdrop-blur-xl rounded-xl overflow-hidden border border-purple-900/50 p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-purple-300 hover:text-pink-300 hover:bg-purple-900/30"
              onClick={onClose}
            >
              <X size={18} />
            </Button>

            <div className="flex flex-col items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 flex items-center justify-center mb-4">
                <LogIn size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-purple-300 text-sm mt-1">Log in to your NEON PULSE account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-md blur opacity-30 group-hover:opacity-70 transition-opacity"></div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="relative border-0 bg-black/80 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-pink-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-md blur opacity-30 group-hover:opacity-70 transition-opacity"></div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="relative border-0 bg-black/80 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-pink-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-purple-300">
                    Remember me
                  </Label>
                </div>

                <Button variant="link" className="text-sm text-pink-400 hover:text-pink-300 p-0">
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-500 hover:via-pink-400 hover:to-cyan-400 text-white py-6"
              >
                Log In
              </Button>

              <div className="text-center text-sm text-purple-300">
                Don't have an account?{" "}
                <Button variant="link" className="text-pink-400 hover:text-pink-300 p-0" onClick={onSignupClick}>
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
