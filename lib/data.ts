export interface Skill {
  name: string
  icon: string
  level: number
}

export interface SkillsData {
  languages: Skill[]
  frameworks: Skill[]
  tools: Skill[]
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

export interface PortfolioData {
  skills: SkillsData
  projects: Project[]
  career: CareerItem[]
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const response = await fetch("/api/data")

  if (!response.ok) {
    throw new Error("Failed to fetch portfolio data")
  }

  return response.json()
}
