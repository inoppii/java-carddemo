# データベース物理設計書 (PostgreSQL)

## 1. Customer (顧客テーブル)
顧客の基本情報を管理する。

| Column Name | Type | Constraints | Description |
|---|---|---|---|
| customer_id | SERIAL | PK | 内部ID (自動採番) |
| first_name | VARCHAR(50) | NOT NULL | 名 |
| last_name | VARCHAR(50) | NOT NULL | 姓 |
| date_of_birth | DATE | NOT NULL | 生年月日 |
| address | VARCHAR(100) | | 住所 |
| city | VARCHAR(50) | | 市区町村 |
| state | VARCHAR(20) | | 州/県 |
| zip_code | VARCHAR(10) | | 郵便番号 |
| phone_number | VARCHAR(15) | | 電話番号 |
| email | VARCHAR(100) | | メールアドレス |
| created_at | TIMESTAMP | | 作成日時 |
| updated_at | TIMESTAMP | | 更新日時 |

## 2. Account (口座テーブル)
クレジットカード口座を管理する。

| Column Name | Type | Constraints | Description |
|---|---|---|---|
| account_id | SERIAL | PK | 内部ID |
| customer_id | INTEGER | FK (Customer) | 顧客ID |
| account_number | VARCHAR(20) | UNIQUE, NOT NULL | 口座番号 |
| account_status | VARCHAR(10) | | ステータス (ACTIVE/CLOSED/SUSPENDED) |
| balance | DECIMAL(15,2) | | 現在残高 |
| credit_limit | DECIMAL(15,2) | NOT NULL | 与信限度額 |
| interest_rate | DECIMAL(5,4) | | 利率 |
| open_date | DATE | | 開設日 |

## 3. Card (カードテーブル)
発行されたクレジットカードを管理する。

| Column Name | Type | Constraints | Description |
|---|---|---|---|
| card_id | SERIAL | PK | 内部ID |
| account_id | INTEGER | FK (Account) | 口座ID |
| card_number | VARCHAR(16) | UNIQUE, NOT NULL | カード番号 |
| card_type | VARCHAR(20) | NOT NULL | カード種別 (VISA/MASTER等) |
| expiration_date | DATE | NOT NULL | 有効期限 |
| cvv | VARCHAR(4) | NOT NULL | セキュリティコード |
| card_status | VARCHAR(10) | | ステータス |

## 4. Transaction_History (取引履歴テーブル)
カード利用履歴を管理する。

| Column Name | Type | Constraints | Description |
|---|---|---|---|
| transaction_id | UUID | PK | 取引ID |
| card_id | INTEGER | FK (Card) | カードID |
| transaction_type | VARCHAR(20) | NOT NULL | 取引種別 (PURCHASE/PAYMENT) |
| amount | DECIMAL(15,2) | NOT NULL | 取引金額 |
| merchant_name | VARCHAR(100) | | 加盟店名 |
| transaction_date | TIMESTAMP | | 取引日時 |
| status | VARCHAR(20) | | 状態 (PENDING/COMPLETED) |

## 5. App_User (システムユーザーテーブル)
システム利用者の認証情報を管理する（RACF代替）。

| Column Name | Type | Constraints | Description |
|---|---|---|---|
| user_id | VARCHAR(20) | PK | ユーザーID (USER001等) |
| password_hash | VARCHAR(255) | NOT NULL | パスワードハッシュ |
| role | VARCHAR(20) | NOT NULL | 権限 (USER/ADMIN) |
