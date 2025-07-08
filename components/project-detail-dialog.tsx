"use client"

import { useState, useEffect, useCallback } from "react"
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

  // useCallbackでloadContent関数をメモ化
  const loadContent = useCallback(async () => {
    // 最初にログを出力して関数が呼ばれていることを確認
    console.log("=== loadContent called ===")
    console.log("Project:", project?.title)
    console.log("DetailFile:", project?.detailFile)
    console.log("Open:", open)

    if (!project?.detailFile) {
      console.log("No detail file specified, returning early")
      setError("詳細ファイルが指定されていません")
      return
    }

    console.log("Starting load process...")
    setLoading(true)
    setError(null)
    setContent("")
    setRawMarkdown("")

    const currentAttempt = fetchAttempts + 1
    setFetchAttempts(currentAttempt)

    console.log(`=== Project Detail Load Attempt ${currentAttempt} ===`)
    console.log("Timestamp:", new Date().toISOString())

    try {
      const url = `/${project.detailFile}`
      console.log("Fetching URL:", url)
      console.log("About to call fetch...")

      const response = await fetch(url, {
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      console.log("Fetch completed!")
      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      console.log("About to read response text...")
      const markdown = await response.text()
      console.log("Response text read successfully!")
      console.log("Markdown length:", markdown.length)

      if (!markdown || markdown.trim() === "") {
        throw new Error("マークダウンファイルが空です")
      }

      setRawMarkdown(markdown)
      console.log("Raw markdown set")

      console.log("About to parse markdown...")
      const parsedContent = parseMarkdown(markdown)
      console.log("Markdown parsed successfully!")
      console.log("Parsed content length:", parsedContent.length)

      if (!parsedContent || parsedContent.trim() === "") {
        throw new Error("マークダウンの解析結果が空です")
      }

      setContent(parsedContent)
      console.log("Content set successfully!")
    } catch (err) {
      console.error("=== ERROR in loadContent ===")
      console.error("Error object:", err)
      console.error("Error type:", typeof err)
      console.error("Error name:", err instanceof Error ? err.name : "Unknown")
      console.error("Error message:", err instanceof Error ? err.message : String(err))
      console.error("Stack trace:", err instanceof Error ? err.stack : "No stack")

      let errorMessage = "不明なエラーが発生しました"
      if (err instanceof Error) {
        errorMessage = err.message
      } else {
        errorMessage = String(err)
      }

      setError(`プロジェクト詳細の読み込みに失敗しました: ${errorMessage}`)
    } finally {
      console.log("Setting loading to false...")
      setLoading(false)
      console.log("Load attempt completed")
    }
  }, [project?.detailFile, project?.title, fetchAttempts])

  // useEffectを簡素化
  useEffect(() => {
    console.log("=== useEffect triggered ===")
    console.log("Open:", open)
    console.log("Project:", project?.title)
    console.log("DetailFile:", project?.detailFile)

    if (open && project?.detailFile) {
      console.log("Conditions met, calling loadContent...")
      // 少し遅延を入れてUIの更新を確実にする
      setTimeout(() => {
        loadContent().catch((err) => {
          console.error("Unhandled error in loadContent:", err)
          setError(`予期しないエラー: ${err instanceof Error ? err.message : String(err)}`)
          setLoading(false)
        })
      }, 100)
    } else {
      console.log("Conditions not met, resetting state...")
      setContent("")
      setError(null)
      setRawMarkdown("")
      setLoading(false)
    }
  }, [open, project?.detailFile, loadContent])

  const handleRetry = () => {
    console.log("=== Manual retry triggered ===")
    loadContent().catch((err) => {
      console.error("Error in manual retry:", err)
      setError(`再試行エラー: ${err instanceof Error ? err.message : String(err)}`)
      setLoading(false)
    })
  }

  // ダイアログが閉じられた時の処理
  useEffect(() => {
    if (!open) {
      console.log("Dialog closed, resetting state...")
      setContent("")
      setError(null)
      setRawMarkdown("")
      setLoading(false)
      setFetchAttempts(0)
    }
  }, [open])

  if (!project) {
    console.log("No project provided")
    return null
  }

  console.log("=== Render state ===")
  console.log("Loading:", loading)
  console.log("Error:", error)
  console.log("Content length:", content.length)
  console.log("Raw markdown length:", rawMarkdown.length)

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
              <Button variant="outline" onClick={handleRetry}>
                <RefreshCw className="w-4 h-4 mr-2" />
                再試行
              </Button>
            )}
          </div>

          {/* 常に表示されるデバッグ情報 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Debug Info</h4>
            <div className="text-xs space-y-1">
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
          </div>

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
                <Button variant="outline" onClick={handleRetry} size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  再試行
                </Button>
              </div>
            )}

            {!loading && !error && content && (
              <div className="markdown-content bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            )}

            {!loading && !error && !content && rawMarkdown && (
              <div className="text-yellow-600 dark:text-yellow-400 text-center py-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <p className="mb-4">マークダウンファイルは読み込まれましたが、パースに失敗しました。</p>
                <p className="text-xs mb-4">Raw length: {rawMarkdown.length}</p>
                <Button variant="outline" onClick={handleRetry} size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  再試行
                </Button>
              </div>
            )}

            {!loading && !error && !content && !rawMarkdown && project.detailFile && (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
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
