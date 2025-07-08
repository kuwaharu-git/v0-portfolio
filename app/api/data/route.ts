export const runtime = "edge" // filesystem-less, works in Next.js

import { NextResponse } from "next/server"

// ---------- Types ----------
export interface Skill {
  name: string
  icon: string
  level: number
}

export interface Certification {
  name: string
  icon: string
  date: string
}

export interface SkillsData {
  languages: Skill[]
  frameworks: Skill[]
  tools: Skill[]
  certifications: Certification[]
}

export interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl: string
  liveUrl: string
}

export interface CareerItem {
  date: string
  title: string
  description: string
}

// ---------- Statically-imported JSON ----------
import skillsJson from "../../../data/skills.json"
import projectsJson from "../../../data/projects.json"
import careerJson from "../../../data/career.json"

// ---------- Handler ----------
export async function GET() {
  try {
    const data = {
      skills: skillsJson as SkillsData,
      projects: projectsJson as Project[],
      career: careerJson as CareerItem[],
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("API /api/data error:", error)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
