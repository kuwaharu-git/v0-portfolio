"use client"

import { motion } from "framer-motion"
import { Code, Database, Shield, Cpu, Globe, Zap } from "lucide-react"

const icons = [Code, Database, Shield, Cpu, Globe, Zap]

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-500/10 dark:text-blue-400/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          <Icon size={24 + Math.random() * 24} />
        </motion.div>
      ))}
    </div>
  )
}
