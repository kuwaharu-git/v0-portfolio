"use client"

import { useState, useEffect } from "react"
import {
  Moon,
  Sun,
  Github,
  Twitter,
  Globe,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Code,
  Database,
  Shield,
  Award,
  GraduationCap,
  User,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  getSkillsData,
  getProjectsData,
  getCareerData,
  type SkillsData,
  type Project,
  type CareerItem,
} from "@/lib/data"

const IconComponent = ({ iconName, className = "w-6 h-6" }: { iconName: string; className?: string }) => {
  const icons: { [key: string]: any } = {
    Code,
    Database,
    Shield,
    Award,
    GraduationCap,
    Briefcase,
  }

  const Icon = icons[iconName] || Code
  return <Icon className={className} />
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null)
  const [projectsData, setProjectsData] = useState<Project[]>([])
  const [careerData, setCareerData] = useState<CareerItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [skills, projects, career] = await Promise.all([getSkillsData(), getProjectsData(), getCareerData()])

        setSkillsData(skills)
        setProjectsData(projects)
        setCareerData(career)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-gray-900 dark:text-white">kuwaharu</div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <a
                  href="#about"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#skills"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#career"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Career
                </a>
              </nav>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">kuwaharu</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">Backend & Security Enthusiast</p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Twitter className="w-8 h-8" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Globe className="w-8 h-8" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Mail className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="w-48 h-48 mx-auto md:mx-0 mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-24 h-24 text-white" />
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                I'm a student at a 4-year technical college (graduating in 2027), passionate about backend development
                and cybersecurity. I enjoy building secure and scalable web applications using Python and JavaScript.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                My journey in technology is driven by a deep curiosity about how systems work and how to make them more
                secure. I'm constantly learning new technologies and applying them to real-world projects.
              </p>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Japan</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <GraduationCap className="w-5 h-5 mr-2" />
                <span>Technical College Student (Class of 2027)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Skills & Expertise
          </h2>

          {skillsData && (
            <div className="space-y-12">
              {/* Languages */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Languages</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {skillsData.languages.map((skill, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <IconComponent
                          iconName={skill.icon}
                          className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400"
                        />
                        <p className="font-medium text-gray-900 dark:text-white">{skill.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Frameworks & Libraries</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {skillsData.frameworks.map((skill, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <IconComponent
                          iconName={skill.icon}
                          className="w-8 h-8 mx-auto mb-3 text-green-600 dark:text-green-400"
                        />
                        <p className="font-medium text-gray-900 dark:text-white">{skill.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillsData.certifications.map((cert, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 flex items-center">
                        <IconComponent
                          iconName={cert.icon}
                          className="w-8 h-8 mr-4 text-purple-600 dark:text-purple-400"
                        />
                        <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                    <a
                      href={project.liveUrl}
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career & History Section */}
      <section id="career" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Career & History
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gray-300 dark:bg-gray-600"></div>

            {careerData.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-800"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Let's connect and build something amazing together!</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Globe className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 kuwaharu. Built with React and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}
