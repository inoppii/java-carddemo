# 仕様書: ビジネスロジックの完全移植

## 概要
CardDemo アプリケーションのビジネスロジック（COBOL コピーブック定義、計算ロジック、バッチ処理）を Java (Spring Boot) に完全移植する。

## 詳細仕様
### 1. コピーブック定義のドメインモデル反映
- COBOL コピーブック (CPY) で定義されているデータ構造、バリデーションルール、業務ルールを Java のエンティティおよび Value Object に反映する。
- 特に以下の項目を重点的に移植する:
    - 入力値チェック（桁数、属性、必須チェック）
    - コード値の定義（Enum等への変換）

### 2. 計算ロジックの移植
- 利息計算 (Interest Calculation)
- 手数料計算 (Fee Calculation)
- 支払い計算 (Bill Payment Calculation)

### 3. バッチ処理の移植
- Spring Batch を用いて、既存の JCL バッチジョブと同等の機能を実装する。
- アカウント更新バッチ
- 取引集計バッチ

## 技術スタック
- 言語: Java 17+
- フレームワーク: Spring Boot, Spring Batch
- データベース: PostgreSQL
