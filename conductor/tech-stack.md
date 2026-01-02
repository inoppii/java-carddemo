# 技術スタック

## 現行スタック (メインフレーム)
- **言語:** COBOL, Assembler
- **オンライン・トランザクション:** CICS
- **データベース/ストレージ:** VSAM (KSDS/ESDS/RRDS), IBM DB2, IMS DB
- **バッチ処理:** JCL
- **セキュリティ:** RACF

## 移行先スタック (クラウドネイティブ)
- **バックエンド言語/フレームワーク:**
  - Node.js (TypeScript)
  - Java (Spring Boot)
- **データベース:**
  - Cloud SQL for PostgreSQL (主要ストレージ)
- **メッセージング/統合:**
  - Cloud Pub/Sub (非同期通信、MQの代替)
- **フロントエンド:**
  - モダン Web UI フレームワーク (React または Angular)
  - UI ライブラリ: Material Design コンポーネント
- **クラウドプラットフォーム:**
  - Google Cloud Platform (GCP)