概要

QRコードを使って、目の前の相手へ情報を安全に手渡すWebアプリです。
情報を受信者向けに暗号化することで、サーバーに情報本文を保存せず、スマートフォン同士で安全に情報交換できます。MVPではデジタル名刺の交換に対応しています。

主な機能

* デジタル名刺の作成・交換
* QRコードによる暗号化情報の受け渡し
* 受信者ごとの暗号化・復号
* 通常QR・音響・オフラインQRによる情報交換
* 複数QRフレームによるデータ転送
* 受信データの端末内保存
* PWA対応

技術スタック

* TypeScript
* React
* Vite
* Hono
* Cloudflare Workers
* Cloudflare Durable Objects
* GitHub Actions