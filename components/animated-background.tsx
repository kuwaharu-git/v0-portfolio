"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Simplified static gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(45deg, #f0f9ff, #ffffff, #faf5ff)",
        }}
      />

      {/* Dark mode gradient overlay */}
      <div
        className="absolute inset-0 dark:opacity-100 opacity-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(45deg, #0f172a, #1e293b, #312e81)",
        }}
      />

      {/* Simplified animated orbs (reduced from 5 to 2) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400/15 dark:bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 80, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-400/15 dark:bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 50, -15, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Reduced floating particles (from 8 to 4) */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-300/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 8,
          }}
        />
      ))}

      {/* Simplified grid pattern */}
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%239C92AC%22 fillOpacity%3D%220.03%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%236366f1%22 fillOpacity%3D%220.08%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"
      />
    </div>
  )
}

export default AnimatedBackground
