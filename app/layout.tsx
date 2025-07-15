import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kuwaharu\'s Portfolio',
  description: 'システムエンジニアを目指す学生のポートフォリオ',
  generator: 'v0.dev',
  authors: [{ name: 'Kuwaharu' }],
  keywords: ['portfolio', 'web developer', 'projects', 'Kuwaharu', 'システムエンジニア', '学生'],
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    title: 'Kuwaharu\'s Portfolio',
    description: 'システムエンジニアを目指す学生のポートフォリオ',
    url: 'https://www.kuwaharu.com',
    siteName: 'Kuwaharu\'s Portfolio',
    images: [
      {
        url: 'https://www.kuwaharu.com/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Kuwaharu\'s Portfolio',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kuwaharu\'s Portfolio',
    description: 'システムエンジニアを目指す学生のポートフォリオ',
    images: ['https://www.kuwaharu.com/thumbnail.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
