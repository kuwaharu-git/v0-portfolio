"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, RefreshCw } from "lucide-react"
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

  const currentProjectRef = useRef<string | null>(null)
  const loadingRef = useRef(false)

  const loadContent = async (forceReload = false) => {
    const projectKey = project?.detailFile

    if (!projectKey) {
      setError("詳細ファイルが指定されていません")
      return
    }

    // 既に同じプロジェクトを読み込み中の場合はスキップ
    if (loadingRef.current && currentProjectRef.current === projectKey && !forceReload) {
      return
    }

    // 既に同じプロジェクトが読み込まれている場合はスキップ（強制リロードでない限り）
    if (currentProjectRef.current === projectKey && content && !forceReload) {
      return
    }

    loadingRef.current = true
    currentProjectRef.current = projectKey
    setLoading(true)
    setError(null)

    if (forceReload) {
      setContent("")
    }

    try {
      const url = `/${projectKey}`
      const response = await fetch(url, {
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const markdown = await response.text()

      if (!markdown || markdown.trim() === "") {
        throw new Error("マークダウンファイルが空です")
      }

      const parsedContent = parseMarkdown(markdown)

      if (!parsedContent || parsedContent.trim() === "") {
        throw new Error("マークダウンの解析結果が空です")
      }

      setContent(parsedContent)
    } catch (err) {
      let errorMessage = "不明なエラーが発生しました"
      if (err instanceof Error) {
        errorMessage = err.message
      }
      setError(`プロジェクト詳細の読み込みに失敗しました: ${errorMessage}`)
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }

  useEffect(() => {
    if (open && project?.detailFile) {
      const timeoutId = setTimeout(() => {
        loadContent(false)
      }, 100)

      return () => {
        clearTimeout(timeoutId)
      }
    } else if (!open) {
      setContent("")
      setError(null)
      setLoading(false)
      currentProjectRef.current = null
      loadingRef.current = false
    }
  }, [open, project?.detailFile])

  const handleRetry = () => {
    loadContent(true)
  }

  if (!project) {
    return null
  }

  const shouldShowContent = !loading && !error && content && content.trim() !== ""
  const shouldShowError = !loading && error
  const shouldShowLoading = loading
  const shouldShowEmpty = !loading && !error && !content && project.detailFile
  const shouldShowNoFile = !project.detailFile

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">{project.description}</DialogDescription>
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
            {project.githubUrl != "" &&
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            }
            {project.liveUrl != "" &&
            <Button variant="outline" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
            }
            {(error || (!loading && !content && project.detailFile)) && (
              <Button variant="outline" onClick={handleRetry} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                再試行
              </Button>
            )}
          </div>

          {/* コンテンツ */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {shouldShowLoading && (
              <div className="flex items-center justify-center py-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="ml-3 text-blue-600 dark:text-blue-300">読み込み中...</p>
              </div>
            )}

            {shouldShowError && (
              <div className="text-red-600 dark:text-red-400 text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <p className="mb-4">{error}</p>
                <Button variant="outline" onClick={handleRetry} size="sm" disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  再試行
                </Button>
              </div>
            )}

            {shouldShowContent && (
              <div className="markdown-content">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            )}

            {shouldShowEmpty && (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                <p className="mb-4">コンテンツが見つかりませんでした。</p>
                <Button variant="outline" onClick={handleRetry} size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  再試行
                </Button>
              </div>
            )}

            {shouldShowNoFile && (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                <p>このプロジェクトには詳細情報がありません。</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
