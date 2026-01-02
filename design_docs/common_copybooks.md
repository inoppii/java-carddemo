# 共通コピーブック解析レポート

オンライン・プログラム間でのデータ共有や共通処理に使用されるコピーブックの解析結果。

## 1. COCOM01Y (CARDDEMO-COMMAREA)
プログラム間の通信領域 (DFHCOMMAREA) の構造を定義。

### 構造
- **CDEMO-GENERAL-INFO:**
    - `CDEMO-FROM-TRANID / PROGRAM`: 遷移元情報。
    - `CDEMO-TO-TRANID / PROGRAM`: 遷移先情報。
    - `CDEMO-USER-ID`: ログインユーザーID。
    - `CDEMO-USER-TYPE`: 権限 ('A'=Admin, 'U'=User)。
    - `CDEMO-PGM-CONTEXT`: 実行コンテキスト (0=初回, 1=再入)。
- **CDEMO-CUSTOMER-INFO:** 選択中の顧客情報 (ID, 氏名)。
- **CDEMO-ACCOUNT-INFO:** 選択中のアカウント情報 (ID, ステータス)。
- **CDEMO-CARD-INFO:** 選択中のカード番号。
- **CDEMO-MORE-INFO:** 直前のマップ情報。

## 2. COTTL01Y (CCDA-SCREEN-TITLE)
画面上部に表示される共通タイトル行の構造を定義。
- `CCDA-TITLE01`: 'AWS Mainframe Modernization' 等の固定文言。

## 3. CSUSR01Y (USER-SEC-RECORD)
ユーザーセキュリティファイル (USRSEC) のレコード構造。
- `SEC-USR-ID`: ユーザーID。
- `SEC-USR-PWD`: パスワード。
- `SEC-USR-TYPE`: ユーザー種別。

## 4. CSMSG01Y (CSMSG01Y)
共通メッセージ定義。
- エラーメッセージや確認メッセージの定数。
