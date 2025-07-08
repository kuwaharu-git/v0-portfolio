export function parseMarkdown(markdown: string): string {
  // シンプルなマークダウンパーサー
  let html = markdown
    // ヘッダー
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">$1</h1>')

    // 太字
    .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')

    // コードブロック
    .replace(
      /```([\s\S]*?)```/gim,
      '<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto mb-4"><code class="text-sm">$1</code></pre>',
    )

    // インラインコード
    .replace(/`([^`]*)`/gim, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')

    // リスト
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')

    // 段落
    .replace(/\n\n/gim, '</p><p class="mb-4 text-gray-600 dark:text-gray-300">')

  // 段落タグで囲む
  html = '<p class="mb-4 text-gray-600 dark:text-gray-300">' + html + "</p>"

  // リストをul要素で囲む
  html = html.replace(/(<li.*?<\/li>)/gims, (match) => {
    return '<ul class="mb-4">' + match + "</ul>"
  })

  return html
}
