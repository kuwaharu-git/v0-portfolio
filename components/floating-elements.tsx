"use client"

import { motion } from "framer-motion"
import { Code, Database, Shield } from "lucide-react"

// Reduced from 6 to 3 icons
const icons = [Code, Database, Shield]

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-500/8 dark:text-blue-400/8"
          style={{
            left: `${20 + index * 30}%`,
            top: `${20 + index * 25}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + index * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 2,
          }}
        >
          <Icon size={20} />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingElements
