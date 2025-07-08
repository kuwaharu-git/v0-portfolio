"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
}

export function TypewriterText({ text, delay = 0, speed = 150 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        },
        delay + currentIndex * speed,
      )
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, delay, speed])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 600)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className="inline-block">
      {displayText}
      <span
        className={`inline-block w-0.5 h-1em bg-current ml-1 transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  )
}

export default TypewriterText
