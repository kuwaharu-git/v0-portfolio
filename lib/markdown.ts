export function parseMarkdown(markdown: string): string {
  if (!markdown || markdown.trim() === "") {
    return '<p class="text-gray-500 dark:text-gray-400">コンテンツが見つかりませんでした。</p>'
  }

  const html = markdown
    // コードブロックを先に処理（他の変換と干渉しないように）
    .replace(
      /```([\s\S]*?)```/gim,
      '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6 border"><code class="text-sm text-gray-800 dark:text-gray-200">$1</code></pre>',
    )

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

    // 段落の分割
    .split("\n\n")
    .map((paragraph) => {
      paragraph = paragraph.trim()
      if (!paragraph) return ""

      // リスト項目が含まれている場合
      if (paragraph.includes("<li")) {
        return `<ul class="list-disc list-inside mb-6 space-y-1">${paragraph}</ul>`
      }

      // ヘッダーの場合はそのまま
      if (paragraph.startsWith("<h") || paragraph.startsWith("<pre")) {
        return paragraph
      }

      // 通常の段落
      return `<p class="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">${paragraph}</p>`
    })
    .join("")

  return html
}
