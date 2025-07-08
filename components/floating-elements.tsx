"use client"

import { motion } from "framer-motion"
import { Code, Database, Shield, Server, Lock, Cpu, Globe, Terminal, Zap, Settings, Cloud, Wifi } from "lucide-react"

// アイコンの種類を増やす
const icons = [Code, Database, Shield, Server, Lock, Cpu, Globe, Terminal, Zap, Settings, Cloud, Wifi]

// ランダムなサイズを生成する関数
const getRandomSize = () => {
  const sizes = [12, 16, 20, 24, 28, 32]
  return sizes[Math.floor(Math.random() * sizes.length)]
}

// ランダムな位置を生成する関数
const getRandomPosition = () => ({
  left: Math.random() * 90 + 5, // 5-95%の範囲
  top: Math.random() * 90 + 5, // 5-95%の範囲
})

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* 15個のアイコンを配置 */}
      {[...Array(15)].map((_, index) => {
        const Icon = icons[index % icons.length]
        const size = getRandomSize()
        const position = getRandomPosition()

        return (
          <motion.div
            key={index}
            className="absolute text-blue-500/4 dark:text-blue-400/6"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -20 - Math.random() * 10, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 15, // 20-35秒のランダムな持続時間
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 10, // 0-10秒のランダムな遅延
            }}
          >
            <Icon size={size} />
          </motion.div>
        )
      })}

      {/* さらに小さなアイコンを追加（より薄く） */}
      {[...Array(10)].map((_, index) => {
        const Icon = icons[(index + 5) % icons.length]
        const size = Math.random() * 8 + 8 // 8-16pxのランダムサイズ
        const position = getRandomPosition()

        return (
          <motion.div
            key={`small-${index}`}
            className="absolute text-purple-500/3 dark:text-purple-400/5"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -15 - Math.random() * 8, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              rotate: [0, -360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 25 + Math.random() * 20, // 25-45秒のランダムな持続時間
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 15, // 0-15秒のランダムな遅延
            }}
          >
            <Icon size={size} />
          </motion.div>
        )
      })}

      {/* 極小のアイコン群（装飾用） */}
      {[...Array(8)].map((_, index) => {
        const Icon = icons[(index + 8) % icons.length]
        const size = Math.random() * 4 + 6 // 6-10pxの極小サイズ
        const position = getRandomPosition()

        return (
          <motion.div
            key={`tiny-${index}`}
            className="absolute text-green-500/2 dark:text-green-400/4"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -10 - Math.random() * 5, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 30 + Math.random() * 25, // 30-55秒のランダムな持続時間
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 20, // 0-20秒のランダムな遅延
            }}
          >
            <Icon size={size} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingElements
