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
      {/* Gradient Background with more dynamic animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, #f0f9ff, #ffffff, #faf5ff)",
            "linear-gradient(135deg, #eff6ff, #f8fafc, #f3e8ff)",
            "linear-gradient(225deg, #f0f4ff, #ffffff, #fdf4ff)",
            "linear-gradient(315deg, #f0f9ff, #f8fafc, #faf5ff)",
            "linear-gradient(45deg, #f0f9ff, #ffffff, #faf5ff)",
          ],
        }}
        style={{
          background: "linear-gradient(45deg, #f0f9ff, #ffffff, #faf5ff)",
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Dark mode gradient overlay */}
      <motion.div
        className="absolute inset-0 dark:opacity-100 opacity-0 transition-opacity duration-500"
        animate={{
          background: [
            "linear-gradient(45deg, #0f172a, #1e293b, #312e81)",
            "linear-gradient(135deg, #1e1b4b, #1f2937, #4c1d95)",
            "linear-gradient(225deg, #1e3a8a, #1f2937, #581c87)",
            "linear-gradient(315deg, #0f172a, #374151, #312e81)",
            "linear-gradient(45deg, #0f172a, #1e293b, #312e81)",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Animated Orbs with more movement */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, 120, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.3, 0.8, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -30, 0],
          scale: [1, 0.7, 1.4, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/15 dark:bg-green-500/25 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 100, 0],
          y: [0, 100, -60, 0],
          scale: [1, 1.5, 0.9, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 7,
        }}
      />

      {/* Additional smaller orbs for more dynamic feel */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-48 h-48 bg-yellow-400/10 dark:bg-yellow-500/20 rounded-full blur-2xl"
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 70, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-400/10 dark:bg-pink-500/20 rounded-full blur-2xl"
        animate={{
          x: [0, -50, 80, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          duration: 19,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 dark:bg-blue-300/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Grid Pattern with animation */}
      <motion.div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%239C92AC%22 fillOpacity%3D%220.05%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%236366f1%22 fillOpacity%3D%220.1%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Subtle wave effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent dark:via-blue-400/10"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

export default AnimatedBackground
