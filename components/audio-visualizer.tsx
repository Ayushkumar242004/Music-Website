"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AudioVisualizerProps {
  isPlaying: boolean
}

export const AudioVisualizer = ({ isPlaying }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.Listener("resize", setCanvasDimensions)

    // Generate random data for visualization
    const generateRandomData = () => {
      const barCount = 64
      const data = []

      for (let i = 0; i < barCount; i++) {
        // Create a wave-like pattern
        const height = isPlaying ? Math.sin(i * 0.2 + Date.now() * 0.001) * 0.5 + 0.5 : Math.random() * 0.3 + 0.1

        data.push(height)
      }

      return data
    }

    // Draw visualization
    const draw = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Generate data
      const data = generateRandomData()
      const barWidth = canvas.width / data.length

      // Draw bars
      for (let i = 0; i < data.length; i++) {
        const height = data[i] * canvas.height
        const x = i * barWidth

        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - height)
        gradient.addColorStop(0, "rgba(103, 232, 249, 0.8)") // cyan
        gradient.addColorStop(1, "rgba(147, 51, 234, 0.8)") // purple

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - height, barWidth - 1, height)
      }

      // Add glow effect
      ctx.globalCompositeOperation = "lighter"
      ctx.filter = "blur(4px)"

      for (let i = 0; i < data.length; i++) {
        const height = data[i] * canvas.height * 0.7
        const x = i * barWidth

        ctx.fillStyle = "rgba(103, 232, 249, 0.3)"
        ctx.fillRect(x, canvas.height - height, barWidth - 1, height)
      }

      ctx.filter = "none"
      ctx.globalCompositeOperation = "source-over"

      // Request next frame
      requestAnimationFrame(draw)
    }

    // Start animation
    const animationId = requestAnimationFrame(draw)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [isPlaying])

  return (
    <motion.canvas
      ref={canvasRef}
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  )
}
