"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Code, Database, Shield, Server, Lock, Cpu, Globe, Terminal, Zap, Settings, Cloud, Wifi } from "lucide-react"

const icons = [Code, Database, Shield, Server, Lock, Cpu, Globe, Terminal, Zap, Settings, Cloud, Wifi]

interface FloatingIcon {
  iconIndex: number
  size: number
  left: number
  top: number
  duration: number
  delay: number
  drift: number
}

export function FloatingElements() {
  // SSRとの不一致やレンダーごとの再配置を防ぐため、クライアント側で一度だけ生成する
  const [items, setItems] = useState<FloatingIcon[] | null>(null)

  useEffect(() => {
    setItems(
      Array.from({ length: 12 }, (_, i) => ({
        iconIndex: i % icons.length,
        size: 14 + Math.random() * 14, // 14-28px
        left: Math.random() * 90 + 5, // 5-95%
        top: Math.random() * 90 + 5, // 5-95%
        duration: 18 + Math.random() * 12, // 18-30秒
        delay: Math.random() * 8,
        drift: Math.random() * 16 - 8,
      })),
    )
  }, [])

  if (!items) return null

  return (
    <div className="fixed inset-0 pointer-events-none -z-10" aria-hidden="true">
      {items.map((item, index) => {
        const Icon = icons[item.iconIndex]
        return (
          <motion.div
            key={index}
            className="absolute text-blue-500/10 dark:text-blue-300/10"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
            }}
            animate={{
              y: [0, -16, 0],
              x: [0, item.drift, 0],
              rotate: [0, 6, -6, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <Icon size={item.size} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingElements
