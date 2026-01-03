# プラン: Google Cloud 環境構築と初期デプロイ

## フェーズ 1: Google Cloud プロジェクト環境準備
GCPプロジェクトの基本設定と必要なAPIの有効化を行います。

- [x] **タスク 1:** `gcloud` CLI の認証とプロジェクト設定確認。
- [x] **タスク 2:** 必要なAPIの有効化 (Artifact Registry, Cloud Run, Cloud SQL, Cloud Build)。
- [x] **タスク: Conductor - User Manual Verification**

## フェーズ 2: データベース (Cloud SQL) 構築
PostgreSQL インスタンスを構築し、初期設定を行います。

- [~] **タスク 1:** Cloud SQL for PostgreSQL インスタンスの作成。
- [ ] **タスク 2:** データベース (`carddemo`) とユーザー (`carddemo_user`) の作成。
- [ ] **タスク: Conductor - User Manual Verification**

## フェーズ 3: コンテナビルドとプッシュ
アプリケーションをコンテナイメージ化し、Artifact Registry にプッシュします。

- [ ] **タスク 1:** Artifact Registry リポジトリの作成。
- [ ] **タスク 2:** バックエンド (`carddemo-backend`) の Dockerfile 作成とビルド＆プッシュ。
- [ ] **タスク 3:** フロントエンド (`carddemo-frontend`) の Dockerfile 作成とビルド＆プッシュ。
- [ ] **タスク: Conductor - User Manual Verification**

## フェーズ 4: Cloud Run デプロイと動作確認
コンテナを Cloud Run にデプロイし、システムを稼働させます。

- [x] **タスク 1:** バックエンドサービスのデプロイ (Cloud SQL 接続設定含む)。
- [x] **タスク 2:** フロントエンドサービスのデプロイ (バックエンドURL設定含む)。
- [x] **タスク 3:** 初期データ (`schema.sql`, `data.sql`) のロード確認（または手動実行）。
- [x] **タスク 4:** ブラウザからの動作確認。
- [x] **タスク: Conductor - User Manual Verification**
