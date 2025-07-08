"use client"

import { useState, useEffect, useRef } from "react"
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

  // useRefを使って現在のプロジェクトを追跡
  const currentProjectRef = useRef<string | null>(null)
  const loadingRef = useRef(false)

  const loadContent = async (forceReload = false) => {
    const projectKey = project?.detailFile

    console.log("=== loadContent called ===")
    console.log("Project:", project?.title)
    console.log("DetailFile:", projectKey)
    console.log("Force reload:", forceReload)
    console.log("Currently loading:", loadingRef.current)

    if (!projectKey) {
      console.log("No detail file specified")
      setError("詳細ファイルが指定されていません")
      return
    }

    // 既に同じプロジェクトを読み込み中の場合はスキップ
    if (loadingRef.current && currentProjectRef.current === projectKey && !forceReload) {
      console.log("Already loading this project, skipping...")
      return
    }

    // 既に同じプロジェクトが読み込まれている場合はスキップ（強制リロードでない限り）
    if (currentProjectRef.current === projectKey && content && !forceReload) {
      console.log("Project already loaded, skipping...")
      return
    }

    console.log("Starting load process...")
    loadingRef.current = true
    currentProjectRef.current = projectKey
    setLoading(true)
    setError(null)

    if (forceReload) {
      setContent("")
      setRawMarkdown("")
    }

    const currentAttempt = forceReload ? fetchAttempts + 1 : 1
    setFetchAttempts(currentAttempt)

    console.log(`=== Project Detail Load Attempt ${currentAttempt} ===`)

    try {
      const url = `/${projectKey}`
      console.log("Fetching URL:", url)

      const response = await fetch(url, {
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const markdown = await response.text()
      console.log("Markdown length:", markdown.length)

      if (!markdown || markdown.trim() === "") {
        throw new Error("マークダウンファイルが空です")
      }

      setRawMarkdown(markdown)
      console.log("Raw markdown set")

      const parsedContent = parseMarkdown(markdown)
      console.log("Parsed content length:", parsedContent.length)

      if (!parsedContent || parsedContent.trim() === "") {
        throw new Error("マークダウンの解析結果が空です")
      }

      setContent(parsedContent)
      console.log("Content set successfully!")
    } catch (err) {
      console.error("=== ERROR in loadContent ===", err)

      let errorMessage = "不明なエラーが発生しました"
      if (err instanceof Error) {
        errorMessage = err.message
      }

      setError(`プロジェクト詳細の読み込みに失敗しました: ${errorMessage}`)
    } finally {
      console.log("Setting loading to false...")
      setLoading(false)
      loadingRef.current = false
      console.log("Load attempt completed")
    }
  }

  // ダイアログが開かれた時のみ実行
  useEffect(() => {
    console.log("=== useEffect triggered ===")
    console.log("Open:", open)
    console.log("Project:", project?.title)
    console.log("DetailFile:", project?.detailFile)

    if (open && project?.detailFile) {
      console.log("Dialog opened, loading content...")
      // 少し遅延を入れる
      const timeoutId = setTimeout(() => {
        loadContent(false)
      }, 100)

      return () => {
        console.log("Cleaning up timeout...")
        clearTimeout(timeoutId)
      }
    } else if (!open) {
      // ダイアログが閉じられた時の処理
      console.log("Dialog closed, resetting state...")
      setContent("")
      setError(null)
      setRawMarkdown("")
      setLoading(false)
      setFetchAttempts(0)
      currentProjectRef.current = null
      loadingRef.current = false
    }
  }, [open, project?.detailFile]) // 依存配列を最小限に

  const handleRetry = () => {
    console.log("=== Manual retry triggered ===")
    loadContent(true) // 強制リロード
  }

  if (!project) {
    console.log("No project provided")
    return null
  }

  console.log("=== Render state ===")
  console.log("Loading:", loading)
  console.log("Error:", error)
  console.log("Content length:", content.length)

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
            {(error || (!loading && !content && project.detailFile)) && (
              <Button variant="outline" onClick={handleRetry} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                再試行
              </Button>
            )}
          </div>

          {/* デバッグ情報 */}
          <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <summary className="cursor-pointer text-sm font-medium">Debug Info</summary>
            <div className="mt-2 text-xs space-y-1">
              <p>
                <strong>File:</strong> {project.detailFile || "None"}
              </p>
              <p>
                <strong>Fetch attempts:</strong> {fetchAttempts}
              </p>
              <p>
                <strong>Loading:</strong> {loading ? "Yes" : "No"}
              </p>
              <p>
                <strong>Loading ref:</strong> {loadingRef.current ? "Yes" : "No"}
              </p>
              <p>
                <strong>Current project ref:</strong> {currentProjectRef.current || "None"}
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
              <div className="flex items-center justify-center py-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="ml-3 text-blue-600 dark:text-blue-300">読み込み中... (試行 {fetchAttempts})</p>
              </div>
            )}

            {error && (
              <div className="text-red-600 dark:text-red-400 text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <p className="mb-4">{error}</p>
                <Button variant="outline" onClick={handleRetry} size="sm" disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  再試行
                </Button>
              </div>
            )}

            {!loading && !error && content && (
              <div className="markdown-content">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            )}

            {!loading && !error && !content && project.detailFile && (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                <p className="mb-4">コンテンツが見つかりませんでした。</p>
                <Button variant="outline" onClick={handleRetry} size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  再試行
                </Button>
              </div>
            )}

            {!project.detailFile && (
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
