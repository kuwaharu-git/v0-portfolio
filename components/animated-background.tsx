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
      {/* Simplified Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900" />

      {/* Reduced Animated Orbs - only 2 instead of 3 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/15 rounded-full blur-2xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-400/15 rounded-full blur-2xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Simplified Grid Pattern */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:40px_40px]" />
    </div>
  )
}

export default AnimatedBackground
