import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export interface Skill {
  name: string
  icon: string
}

export interface SkillsData {
  languages: Skill[]
  frameworks: Skill[]
  certifications: Skill[]
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

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "data")

    const [skillsFile, projectsFile, careerFile] = await Promise.all([
      fs.readFile(path.join(dataDir, "skills.json"), "utf8"),
      fs.readFile(path.join(dataDir, "projects.json"), "utf8"),
      fs.readFile(path.join(dataDir, "career.json"), "utf8"),
    ])

    const data = {
      skills: JSON.parse(skillsFile) as SkillsData,
      projects: JSON.parse(projectsFile) as Project[],
      career: JSON.parse(careerFile) as CareerItem[],
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error loading data:", error)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
