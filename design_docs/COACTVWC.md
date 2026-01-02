# 詳細設計書: COACTVWC (Account View)

## 1. 処理概要
指定されたアカウントIDまたは顧客IDに基づき、アカウントの基本情報、残高、リミット、関連するカード情報を照会して表示する。

## 2. 入出力定義
- **画面 (BMS):** `COACTVW` (Mapset), `CACTVWA` (Map)
- **ファイル (VSAM):**
    - `ACCTDAT`: アカウントマスタ (KSDS)
    - `CARDDAT`: カードマスタ (KSDS)
    - `CUSTDAT`: 顧客マスタ (KSDS)
    - `CXACAIX`: カード・アカウントクロスリファレンス (AIX)
- **通信領域 (DFHCOMMAREA):** `CARDDEMO-COMMAREA`

## 3. 処理フロー
1. **初期処理:** 通信領域からアカウントID等を取得し、画面項目を初期化。
2. **検索実行:**
    - アカウントIDが入力された場合: `ACCTDAT` を直接読み込み。
    - 顧客ID等のフィルタが入力された場合: 対応する索引を用いてアカウントを特定。
3. **データ取得:**
    - アカウント情報取得 (`READ-ACCOUNT-MASTER`)。
    - 関連する顧客情報の取得 (`READ-CUSTOMER-MASTER`)。
    - 関連するカード情報の取得。
4. **画面表示:** 取得したデータを画面マップの各項目にセットして `SEND MAP`。

## 4. データベース操作
- `EXEC CICS READ DATASET('ACCTDAT')`: アカウント主情報の取得。
- `EXEC CICS READ DATASET('CUSTDAT')`: 顧客氏名・住所情報の取得。

## 5. 例外処理
- アカウント未存在: `Did not find this account in account master file` を表示。
- ファイルエラー: 詳細なレスポンスコードを含むエラーメッセージを表示。

## 6. 移行への考慮事項
- 複数ファイルの結合処理: 現行は個別に `READ` しているが、移行後は PostgreSQL の `JOIN` を用いて一括取得するように最適化する。
