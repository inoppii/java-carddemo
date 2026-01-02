# 基本設計書 (CardDemo Modernization)

## 1. システム概要
### 1.1 目的と背景
本システム (CardDemo) は、クレジットカード管理業務を行うメインフレームアプリケーションである。
本プロジェクトの目的は、このレガシー資産をクラウドネイティブ技術 (Node.js/Java, PostgreSQL) を用いて Google Cloud Platform (GCP) へ移行し、保守性・拡張性を向上させることにある。
既存の COBOL/CICS/VSAM ベースのシステムから、オープンな技術スタックへの移行を通じて、ベンダーロックインの解消と運用コストの最適化を目指す。

### 1.2 全体機能構成
システムは大きく以下の機能群で構成される。
- **アカウント管理:** 顧客およびクレジットカード口座の管理。
- **カード管理:** クレジットカードの発行、照会、更新。
- **トランザクション処理:** カード利用履歴の照会、決済処理。
- **管理機能:** ユーザー管理、システム設定。

## 2. アーキテクチャ設計
### 2.1 現行アーキテクチャ (Mainframe)
- **プラットフォーム:** IBM Mainframe (z/OS)
- **言語:** COBOL
- **オンライン処理:** CICS (Customer Information Control System)
- **データストア:** VSAM (KSDS/ESDS/RRDS), DB2, IMS DB
- **画面:** BMS (Basic Mapping Support) 3270エミュレータ
- **認証:** RACF (Resource Access Control Facility)

### 2.2 移行後アーキテクチャ (Cloud Native)
- **プラットフォーム:** Google Cloud Platform (GCP)
- **実行環境:** Cloud Run または Google Kubernetes Engine (GKE)
- **言語/フレームワーク:**
    - バックエンド: Node.js (TypeScript) / Java (Spring Boot)
    - フロントエンド: React / Angular (Single Page Application)
- **データストア:** Cloud SQL for PostgreSQL
- **通信:** REST API (HTTP/JSON), gRPC
- **非同期処理:** Cloud Pub/Sub (MQの代替)
- **認証:** IDaaS (Cognito / Auth0) または Cloud IAM

## 3. 機能設計
### 3.1 オンライン処理概要
#### 機能一覧
（ここに記述）

#### 画面遷移概要
（ここに記述）

### 3.2 バッチ処理概要
#### 機能一覧
（ここに記述）

#### ジョブフロー概要
（ここに記述）

## 4. データ設計
### 4.1 データベース構成概要
移行後のデータベースは PostgreSQL を採用し、以下の主要テーブルで構成する。
- **Customer:** 顧客基本情報 (ID, 氏名, 住所, 連絡先)
- **Account:** 口座情報 (ID, 残高, 限度額, ステータス)
- **Card:** カード情報 (番号, 有効期限, 紐付け口座)
- **Transaction_History:** 取引履歴 (日時, 金額,加盟店)
- **Auth_Fraud:** 不正利用検知データ
- **Reference Data:** 取引種別、カテゴリ等のマスタデータ

各テーブルは VSAM および DB2 から移行され、適切な外部キー制約とインデックスにより整合性と性能を確保する。

### 4.2 入出力ファイル概要
現行の VSAM ファイルは基本的に RDB テーブルへ移行する。
バッチ処理で発生する中間ファイルや帳票データについては、Google Cloud Storage (GCS) 上のオブジェクト、またはデータベース内の一時テーブルとして扱う。

## 5. 外部インターフェース設計
### 5.1 システム間連携概要
- **API連携:** フロントエンドとバックエンド、およびマイクロサービス間は REST API または gRPC で連携する。
- **メッセージング:** 外部システムや非同期処理（承認フロー等）との連携には Cloud Pub/Sub を使用する。MQ メッセージのフォーマットは JSON 等のオープンな形式に変換する。

## 6. 移行方針
### 6.1 アプリケーション移行方針
（ここに記述）

### 6.2 データ移行方針
（ここに記述）