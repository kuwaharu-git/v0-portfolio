# Kuwaharu's Portfolio

*[v0.dev](https://v0.dev) で作成したポートフォリオサイト*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/kuwaharu-gits-projects/v0-v0-portfolio)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/pfywdy6wx04)

## 概要

システムエンジニアを目指す学生のポートフォリオサイトです。
このリポジトリは [v0.dev](https://v0.dev) のデプロイと自動同期されています。
[v0.dev](https://v0.dev) での変更は自動的にこのリポジトリにプッシュされます。

## 開発手順

このポートフォリオサイトは以下の手順で開発しました：

### 1. 初期設定
- [v0.dev](https://v0.dev) でプロジェクトを作成
- GitHub連携を設定
- Vercelでのデプロイ環境を構築

### 2. 機能別ブランチ開発
実際のマージ履歴に基づく開発順序：

1. `fix-first-view` - 初期表示の修正
2. `fix-file-structure` - ファイル構造の整理
3. `fix-header` - ヘッダーの修正
4. `add-skill-items` - スキルアイテムの追加
5. `featured-projects-pop-up` - プロジェクト詳細ポップアップ機能
6. `rich-design` - リッチデザインとアニメーション実装
7. `fix-background` - 背景の修正
8. `7-set-data` - データ設定とプロフィール画像更新
9. `10-fix-reload-error` - リロードエラー修正（motion.div対応）
10. `12-fix-pagetsx` - Card コンポーネントの animation 対応
11. `14-reduce-processing` - パフォーマンス最適化
12. `15-fix-information` - メタデータ・ブランディング情報修正
13. `17-fix-readememd` - README.md の改善

### 3. 主要技術スタック
- **フレームワーク**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **アニメーション**: Framer Motion
- **言語**: TypeScript
- **デプロイ**: Vercel
- **開発ツール**: v0.dev (AI支援開発)

### 4. 開発プロセス
1. v0.devでUI/UXデザインとコンポーネント生成
2. 機能ごとにGitブランチを作成
3. 各ブランチでコードレビュー・テスト
4. mainブランチにマージしてVercelで自動デプロイ
5. パフォーマンスとアクセシビリティの最適化

## デプロイ

プロジェクトは以下のURLで公開されています：

**https://www.kuwaharu.com**

## 継続開発


## 仕組み

1. [v0.dev](https://v0.dev) でプロジェクトを作成・修正
2. v0インターフェースからデプロイ
3. 変更は自動的にこのリポジトリにプッシュ
4. Vercelがこのリポジトリから最新版をデプロイ

## 主要機能

- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **ダークモード**: ライト/ダークテーマ切り替え
- **アニメーション**: Framer Motionによるスムーズなアニメーション
- **パフォーマンス最適化**: 軽量化とローディング最適化
- **SEO対応**: メタタグとOGP設定
- **Note.com連携**: 最新記事の自動取得・表示
- **プロジェクト詳細**: 開発したプロジェクトの詳細表示
- **キャリアタイムライン**: 学習履歴・資格取得の時系列表示


## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
