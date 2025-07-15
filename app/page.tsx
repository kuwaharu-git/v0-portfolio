"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Moon,
  Sun,
  Github,
  Twitter,
  StickyNote,
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
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getPortfolioData, type SkillsData, type Project, type CareerItem } from "@/lib/data"
import { ProjectDetailDialog } from "@/components/project-detail-dialog"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingElements } from "@/components/floating-elements"
import { ScrollIndicator } from "@/components/scroll-indicator"
import Image from "next/image"

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

const getSkillLevelText = (level: number): string => {
  if (level >= 90) return "Expert"
  if (level >= 75) return "Advanced"
  if (level >= 60) return "Intermediate"
  if (level >= 40) return "Beginner"
  return "Learning"
}

const getSkillLevelColor = (level: number): string => {
  if (level >= 90) return "text-green-600 dark:text-green-400"
  if (level >= 75) return "text-blue-600 dark:text-blue-400"
  if (level >= 60) return "text-yellow-600 dark:text-yellow-400"
  if (level >= 40) return "text-orange-600 dark:text-orange-400"
  return "text-red-600 dark:text-red-400"
}

// Optimized animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null)
  const [projectsData, setProjectsData] = useState<Project[]>([])
  const [careerData, setCareerData] = useState<CareerItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Memoize social links to prevent re-renders
  const socialLinks = useMemo(
    () => [
      { icon: Github, href: "https://github.com/kuwaharu-git" },
      { icon: Twitter, href: "https://x.com/kuwaharu_it" },
      { 
        icon: StickyNote, // Noteのアイコンがlucide-react等に無いため、GlobeやBook, FileText, StickyNote等が代用候補
        href: "https://note.com/kuwaharu" 
      },
      { icon: Mail, href: "mailto:contact@kuwaharu.com" },
    ],
    [],
  )

  const navItems = useMemo(() => ["About", "Skills", "Projects", "Career"], [])

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPortfolioData()
        setSkillsData(data.skills)
        setProjectsData(data.projects)
        setCareerData(data.career)
      } catch (error) {
        console.error("Error loading data:", error)
        setError("Failed to load portfolio data")
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
        <AnimatedBackground />
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-red-600 dark:text-red-400 text-xl mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingElements />
      <ScrollIndicator />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="font-bold text-xl text-gray-900 dark:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              kuwaharu
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="text-gray-600 dark:text-gray-300"
                >
                  <AnimatePresence mode="wait">
                    {darkMode ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 dark:text-gray-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <motion.div className="max-w-7xl mx-auto text-center z-10" style={{ y: backgroundY }}>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              kuwaharu
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              student engineer
            </motion.p>
            <motion.div
              className="flex justify-center space-x-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-8 h-8" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </section>

      {/* About Me Section */}
      <motion.section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-48 h-48 mx-auto md:mx-0 mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* アイコンを画像に変更 */}
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover rounded-full"
                  priority // ページ読み込み時に優先的に読み込む
                  quality={90} // 画質設定（1-100）
                />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                システムエンジニアになるために色々勉強中の学生です。
                情報系の4年制の専門学校に通っています。
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                主な得意分野はwebアプリのバックエンド、セキュリティです。普段はPythonをメインに使用して開発をしています。その他AWS, Dockerなどインフラ系やRaspberry piやドローンなどのIoT関連などさまざまなことに興味があります。
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Japan</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  <span>Technical College Student (Class of 2027)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>

          {skillsData && (
            <div className="space-y-12">
              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Languages</h3>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {skillsData.languages.map((skill, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card className="hover:shadow-lg transition-all duration-300 group border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <IconComponent
                              iconName={skill.icon}
                              className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                              <span className={`text-sm font-medium ${getSkillLevelColor(skill.level)}`}>
                                {getSkillLevelText(skill.level)}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Frameworks */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Frameworks & Libraries</h3>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {skillsData.frameworks.map((skill, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card className="hover:shadow-lg transition-all duration-300 group border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <IconComponent
                              iconName={skill.icon}
                              className="w-8 h-8 mr-3 text-green-600 dark:text-green-400"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                              <span className={`text-sm font-medium ${getSkillLevelColor(skill.level)}`}>
                                {getSkillLevelText(skill.level)}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Tools & Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Tools & Technologies</h3>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {skillsData.tools.map((skill, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card className="hover:shadow-lg transition-all duration-300 group border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <IconComponent
                              iconName={skill.icon}
                              className="w-8 h-8 mr-3 text-orange-600 dark:text-orange-400"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                              <span className={`text-sm font-medium ${getSkillLevelColor(skill.level)}`}>
                                {getSkillLevelText(skill.level)}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Certifications</h3>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {skillsData.certifications.map((cert, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card className="hover:shadow-lg transition-all duration-300 group border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-6 flex items-center">
                          <IconComponent
                            iconName={cert.icon}
                            className="w-8 h-8 mr-4 text-purple-600 dark:text-purple-400"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{cert.name}</h4>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{cert.date}</span>
                          </div>
                          <span className="text-2xl text-green-600 dark:text-green-400">✓</span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20 px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {projectsData.map((project, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden"
                  onClick={() => {
                    setSelectedProject(project)
                    setDialogOpen(true)
                  }}
                >
                  <Card>
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        {project.githubUrl != "" &&
                        <motion.a
                          href={project.githubUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </motion.a>
                        }
                        {project.liveUrl != "" && 
                        <motion.a
                          href={project.liveUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live Demo
                        </motion.a>
                        }

                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Career & History Section */}
      <motion.section
        id="career"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            Career & History
          </motion.h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />

            {careerData.map((item, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-800 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
                    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Let's connect and build something amazing together!</p>
          <motion.div
            className="flex justify-center space-x-6 mb-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 kuwaharu. Built with React and Tailwind CSS.
          </p>
        </div>
      </motion.footer>

      {/* Project Detail Dialog */}
      <ProjectDetailDialog project={selectedProject} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
