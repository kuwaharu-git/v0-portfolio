"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  const [rawMarkdown, setRawMarkdown] = useState<string>("")
  const [fetchAttempts, setFetchAttempts] = useState(0)

  const loadContent = async () => {
    if (!project?.detailFile) {
      console.log("No detail file specified")
      return
    }

    setLoading(true)
    setError(null)
    setContent("")
    setRawMarkdown("")
    setFetchAttempts((prev) => prev + 1)

    const currentAttempt = fetchAttempts + 1
    console.log(`=== Project Detail Load Attempt ${currentAttempt} ===`)
    console.log("Project:", project.title)
    console.log("Detail file:", project.detailFile)
    console.log("Timestamp:", new Date().toISOString())

    try {
      const url = `/${project.detailFile}`
      console.log("Fetching URL:", url)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒タイムアウト

      const response = await fetch(url, {
        signal: controller.signal,
        cache: "no-cache", // キャッシュを無効化
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      clearTimeout(timeoutId)

      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const markdown = await response.text()
      console.log("Raw markdown received:")
      console.log("- Length:", markdown.length)
      console.log("- Type:", typeof markdown)
      console.log("- First 100 chars:", markdown.substring(0, 100))
      console.log("- Last 100 chars:", markdown.substring(Math.max(0, markdown.length - 100)))

      if (!markdown || markdown.trim() === "") {
        throw new Error("マークダウンファイルが空です")
      }

      setRawMarkdown(markdown)

      console.log("Parsing markdown...")
      const parsedContent = parseMarkdown(markdown)
      console.log("Parsed content:")
      console.log("- Length:", parsedContent.length)
      console.log("- Preview:", parsedContent.substring(0, 200))

      if (!parsedContent || parsedContent.trim() === "") {
        throw new Error("マークダウンの解析結果が空です")
      }

      setContent(parsedContent)
      console.log("Content set successfully")
    } catch (err) {
      console.error("Error in loadContent:", err)

      let errorMessage = "不明なエラーが発生しました"

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "リクエストがタイムアウトしました"
        } else {
          errorMessage = err.message
        }
      }

      setError(`プロジェクト詳細の読み込みに失敗しました: ${errorMessage}`)
    } finally {
      setLoading(false)
      console.log("Load attempt completed")
    }
  }

  useEffect(() => {
    if (open && project?.detailFile) {
      loadContent()
    }
  }, [open, project])

  const handleRetry = () => {
    console.log("Manual retry triggered")
    loadContent()
  }

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
            {(error || (!loading && !content)) && (
              <Button variant="outline" onClick={handleRetry}>
                <RefreshCw className="w-4 h-4 mr-2" />
                再試行
              </Button>
            )}
          </div>

          {/* デバッグ情報 */}
          <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <summary className="cursor-pointer text-sm font-medium">Debug Info</summary>
            <div className="mt-2 text-xs space-y-1">
              <p>
                <strong>File:</strong> {project.detailFile}
              </p>
              <p>
                <strong>Fetch attempts:</strong> {fetchAttempts}
              </p>
              <p>
                <strong>Loading:</strong> {loading ? "Yes" : "No"}
              </p>
              <p>
                <strong>Error:</strong> {error || "None"}
              </p>
              <p>
                <strong>Raw markdown length:</strong> {rawMarkdown.length}
              </p>
              <p>
                <strong>Parsed content length:</strong> {content.length}
              </p>
              <p>
                <strong>Timestamp:</strong> {new Date().toLocaleString()}
              </p>
            </div>
          </details>

          {/* コンテンツ */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                <p className="ml-3 text-gray-600 dark:text-gray-300">読み込み中... (試行 {fetchAttempts})</p>
              </div>
            )}

            {error && (
              <div className="text-red-600 dark:text-red-400 text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <p className="mb-4">{error}</p>
                <Button variant="outline" onClick={handleRetry} size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  再試行
                </Button>
              </div>
            )}

            {!loading && !error && content && (
              <div className="markdown-content" dangerouslySetInnerHTML={{ __html: content }} />
            )}

            {!loading && !error && !content && rawMarkdown && (
              <div className="text-yellow-600 dark:text-yellow-400 text-center py-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <p className="mb-4">マークダウンファイルは読み込まれましたが、パースに失敗しました。</p>
                <Button variant="outline" onClick={handleRetry} size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  再試行
                </Button>
              </div>
            )}

            {!loading && !error && !content && !rawMarkdown && (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                <p className="mb-4">コンテンツが見つかりませんでした。</p>
                <Button variant="outline" onClick={handleRetry} size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  再試行
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
