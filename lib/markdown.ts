export function parseMarkdown(markdown: string): string {
  console.log("=== Markdown Parser Debug ===")
  console.log("Input markdown length:", markdown?.length || 0)
  console.log("Input markdown type:", typeof markdown)
  console.log("Input markdown preview:", markdown?.substring(0, 100) || "undefined/null")

  if (!markdown || typeof markdown !== "string" || markdown.trim() === "") {
    console.log("Markdown is empty or invalid")
    return '<p class="text-gray-500 dark:text-gray-400">コンテンツが見つかりませんでした。</p>'
  }

  try {
    // 不正な文字列やエスケープ文字を除去
    const cleanMarkdown = markdown
      .replace(/\\`\\`\\`/g, "") // \`\`\` のような不正な文字列を除去
      .replace(/\\\\/g, "\\") // 二重エスケープを修正
      .replace(/\r\n/g, "\n") // Windows改行コードを統一
      .replace(/\r/g, "\n") // Mac改行コードを統一
      .trim()

    console.log("Cleaned markdown length:", cleanMarkdown.length)

    if (!cleanMarkdown) {
      console.log("Cleaned markdown is empty")
      return '<p class="text-gray-500 dark:text-gray-400">コンテンツが空です。</p>'
    }

    const html = cleanMarkdown
      // コードブロックを先に処理（他の変換と干渉しないように）
      .replace(/```[\s\S]*?```/gim, (match) => {
        const content = match.replace(/```/g, "").trim()
        return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6 border"><code class="text-sm text-gray-800 dark:text-gray-200">${content}</code></pre>`
      })

      // ヘッダー
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-3 mt-6 text-gray-900 dark:text-white">$1</h3>')
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-bold mb-4 mt-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">$1</h2>',
      )
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">$1</h1>')

      // 太字
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')

      // インラインコード
      .replace(
        /`([^`]+)`/gim,
        '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">$1</code>',
      )

      // リスト項目
      .replace(/^- (.*$)/gim, '<li class="mb-2 text-gray-600 dark:text-gray-300">$1</li>')

      // 段落の分割と処理
      .split(/\n\s*\n/)
      .map((paragraph) => {
        paragraph = paragraph.trim()
        if (!paragraph) return ""

        // リスト項目が含まれている場合
        if (paragraph.includes("<li")) {
          return `<ul class="list-disc list-inside mb-6 space-y-1">${paragraph}</ul>`
        }

        // ヘッダーやコードブロックの場合はそのまま
        if (paragraph.startsWith("<h") || paragraph.startsWith("<pre")) {
          return paragraph
        }

        // 通常の段落
        return `<p class="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">${paragraph}</p>`
      })
      .filter(Boolean) // 空の要素を除去
      .join("")

    console.log("Generated HTML length:", html.length)
    console.log("Generated HTML preview:", html.substring(0, 200))

    if (!html || html.trim() === "") {
      console.log("Generated HTML is empty")
      return '<p class="text-yellow-600 dark:text-yellow-400">マークダウンの変換に失敗しました。</p>'
    }

    return html
  } catch (error) {
    console.error("Error parsing markdown:", error)
    return `<p class="text-red-600 dark:text-red-400">マークダウンの解析中にエラーが発生しました: ${error instanceof Error ? error.message : "Unknown error"}</p>`
  }
}
