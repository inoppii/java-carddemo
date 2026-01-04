# Product Guide

## Initial Concept
メインフレームから node.js & java, Cloud SQL Postgresql, Cloud Pub/Sub へ移行する

## Target Audience
- メインフレームの移行やモダナイゼーションを検討している開発者やアーキテクト

## Core Goals
- メインフレームから Node.js および Java ベースのマイクロサービスアーキテクチャへの移行を実現する。
- データベースを VSAM/DB2/IMS から Cloud SQL PostgreSQL へ移行する。
- メッセージング基盤を MQ から Cloud Pub/Sub へ移行する。
- ユーザーインターフェースを従来の 3270 エミュレータ画面からモダンな Web UI へ刷新する。
- クラウドネイティブな環境での動作検証とパフォーマンス評価を行う。
- Docker, Terraform, Cloud Build を活用した自動化パイプラインを構築し、迅速なデプロイを実現する。
- **すべての成果物（ソースコードのコメント、ドキュメント、UI）を日本語で作成する。**

## Key Features
- **Modern Web Interface:**
    - 直感的でレスポンシブな日本語によるモダン Web UI。
    - ユーザーロールに応じたダッシュボードと、管理者向けユーザー管理・システム設定画面。
- **Core Management:**
    - 顧客 (Customer)、アカウント (Account)、クレジットカード (Credit Card) の管理機能。
    - トランザクション (Transaction) の履歴照会と追加。
    - 口座情報・カード情報の更新および申請。
    - 請求書支払い (Bill Payment) 機能。
- **Batch Processing:**
    - Spring Batch による日次・夜間バッチ処理（アカウント更新、取引集計）。
    - 各種レポートの生成。
    - 利息計算 (Interest Calculation) ロジックの実装。
- **Authorization Simulation:**
    - クレジットカード承認処理のシミュレーション。
    - Cloud Pub/Sub を用いた非同期メッセージング処理（旧 MQ の代替）。
    - 承認データの Cloud SQL への記録と参照。
