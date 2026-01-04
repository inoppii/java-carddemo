# 仕様書: CI/CDパイプラインとクラウドデプロイ

## 概要
CardDemo アプリケーションのビルド、テスト、デプロイを自動化し、Google Cloud (Cloud Run) への継続的デリバリーを実現する。

## 詳細仕様
### 1. コンテナ化
- バックエンド (Spring Boot): 多段ビルド (Multi-stage build) を用いて、軽量な JRE イメージを作成する。
- フロントエンド (React): Vite でビルドした静的ファイルを Nginx イメージに配置する。

### 2. インフラ定義 (Terraform)
- Google Cloud SQL (PostgreSQL) インスタンスの定義。
- Artifact Registry リポジトリの定義。
- Cloud Run サービスの定義。

### 3. CI/CD パイプライン
- Google Cloud Build を使用。
- リポジトリへのプッシュをトリガーに、コンテナビルドと Cloud Run へのデプロイを実行する。

## 技術スタック
- Docker
- Terraform
- Google Cloud Build
- Google Cloud Run
- Artifact Registry
