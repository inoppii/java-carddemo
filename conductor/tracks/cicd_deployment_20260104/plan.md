# プラン: CI/CDパイプラインとクラウドデプロイ

## フェーズ 1: コンテナ化
アプリケーションを Docker コンテナ化します。

- [x] **タスク 1:** バックエンド (Java) の Dockerfile 作成とビルド検証。 850ac05
- [~] **タスク: Conductor - User Manual Verification**

## フェーズ 2: デプロイ自動化
Google Cloud Build や GitHub Actions を設定します。

- [ ] **タスク 1:** Cloud Build 設定ファイル (`cloudbuild.yaml`) の作成。
- [ ] **タスク 2:** Terraform によるインフラ定義 (Cloud Run, Cloud SQL)。
- [ ] **タスク: Conductor - User Manual Verification**
