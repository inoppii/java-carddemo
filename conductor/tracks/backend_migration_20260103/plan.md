# プラン: バックエンドAPI移行実装 (Spring Boot)

## フェーズ 1: プロジェクト基盤構築
Spring Boot プロジェクトの雛形を作成し、DB接続設定を行います。

- [x] **タスク 1:** Spring Initializr 構成のプロジェクト作成 (Gradle/Maven)。
- [x] **タスク 2:** DB接続設定 (`application.properties`/`yaml`) と Entity クラスの生成。
- [ ] **タスク: Conductor - User Manual Verification**

## フェーズ 2: 認証・共通機能の実装
セキュリティと共通処理を実装します。

- [x] **タスク 1:** Spring Security による JWT 認証基盤の実装。
- [x] **タスク 2:** 共通例外ハンドリングとログ出力設定。
- [x] **タスク: Conductor - User Manual Verification**

## フェーズ 3: 業務ロジック実装
各機能の API を実装します。

- [x] **タスク 1:** アカウント系 API (Controller, Service, Repository) の実装。
- [x] **タスク 2:** カード・取引系 API の実装。
- [x] **タスク 3:** 管理系 API の実装。
- [x] **タスク: Conductor - User Manual Verification**
