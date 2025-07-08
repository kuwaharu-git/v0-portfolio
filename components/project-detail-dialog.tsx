"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { parseMarkdown } from "@/lib/markdown"

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl: string
  liveUrl: string
  detailFile?: string
}

interface ProjectDetailDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailDialog({ project, open, onOpenChange }: ProjectDetailDialogProps) {
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rawMarkdown, setRawMarkdown] = useState<string>("")

  useEffect(() => {
    if (open && project?.detailFile) {
      setLoading(true)
      setError(null)
      setContent("")
      setRawMarkdown("")

      console.log("=== Project Detail Debug ===")
      console.log("Project:", project.title)
      console.log("Detail file:", project.detailFile)
      console.log("Full URL:", `${window.location.origin}/${project.detailFile}`)

      fetch(`/${project.detailFile}`)
        .then((response) => {
          console.log("Response status:", response.status)
          console.log("Response headers:", Object.fromEntries(response.headers.entries()))

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          return response.text()
        })
        .then((markdown) => {
          console.log("Raw markdown length:", markdown.length)
          console.log("Raw markdown (first 200 chars):", markdown.substring(0, 200))
          console.log("Raw markdown (last 200 chars):", markdown.substring(Math.max(0, markdown.length - 200)))

          setRawMarkdown(markdown)

          const parsedContent = parseMarkdown(markdown)
          console.log("Parsed content length:", parsedContent.length)
          console.log("Parsed content preview:", parsedContent.substring(0, 200))

          setContent(parsedContent)
        })
        .catch((err) => {
          console.error("Error fetching project details:", err)
          setError(`プロジェクト詳細の読み込みに失敗しました: ${err.message}`)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [open, project])

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* タグ */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* アクションボタン */}
          <div className="flex space-x-4">
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          </div>

          {/* デバッグ情報（開発時のみ表示） */}
          {process.env.NODE_ENV === "development" && rawMarkdown && (
            <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <summary className="cursor-pointer text-sm font-medium">Debug Info</summary>
              <div className="mt-2 text-xs">
                <p>File: {project.detailFile}</p>
                <p>Raw length: {rawMarkdown.length}</p>
                <p>Parsed length: {content.length}</p>
              </div>
            </details>
          )}

          {/* コンテンツ */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                <p className="ml-3 text-gray-600 dark:text-gray-300">読み込み中...</p>
              </div>
            )}

            {error && (
              <div className="text-red-600 dark:text-red-400 text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                {error}
              </div>
            )}

            {!loading && !error && content && (
              <div className="markdown-content" dangerouslySetInnerHTML={{ __html: content }} />
            )}

            {!loading && !error && !content && rawMarkdown && (
              <div className="text-yellow-600 dark:text-yellow-400 text-center py-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                マークダウンファイルは読み込まれましたが、パースに失敗しました。
              </div>
            )}

            {!loading && !error && !content && !rawMarkdown && (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                コンテンツが見つかりませんでした。
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
