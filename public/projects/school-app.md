## 概要
IT系専門学校の学生向けのwebアプリ

## 主な機能
- 学生プロフィール登録
- プロダクト登録
- プロダクトレビュー

## 技術スタック
サーバーはDjango＋DRFとMySQLで永続化とREST APIを提供。クライアントはNext.js＋TypeScriptを基盤に Tailwind CSS と shadcn/ui でUIを統一し、Axios共通クライアントでAPIを利用。認証はCookieにJWTを格納し、リフレッシュで再取得するようにしています。

