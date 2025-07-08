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

export async function getSkillsData(): Promise<SkillsData> {
  const filePath = path.join(process.cwd(), "data", "skills.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return JSON.parse(fileContents)
}

export async function getProjectsData(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), "data", "projects.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return JSON.parse(fileContents)
}

export async function getCareerData(): Promise<CareerItem[]> {
  const filePath = path.join(process.cwd(), "data", "career.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return JSON.parse(fileContents)
}
