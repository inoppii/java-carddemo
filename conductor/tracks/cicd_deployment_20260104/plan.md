# プラン: CI/CDパイプラインとクラウドデプロイ

## フェーズ 1: コンテナ化 [checkpoint: 2be8c25]
アプリケーションを Docker コンテナ化します。

- [x] **タスク 1:** バックエンド (Java) の Dockerfile 作成とビルド検証。 850ac05
- [x] **タスク 2:** フロントエンド (React) の Dockerfile (Nginx等) 作成とビルド検証。 ae037cc
- [x] **タスク: Conductor - User Manual Verification** 2be8c25

## フェーズ 2: デプロイ自動化
Google Cloud Build や GitHub Actions を設定します。

- [x] **タスク 1:** Cloud Build 設定ファイル (`cloudbuild.yaml`) の作成。 be7cdc2
- [x] **タスク 2:** Terraform によるインフラ定義 (Cloud Run, Cloud SQL)。 b7426b6
- [ ] **タスク: Conductor - User Manual Verification**
