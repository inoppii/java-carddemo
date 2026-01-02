# 現行データ資産分析レポート

## 1. VSAM ファイル分析 (Customer & Account)

### 1.1 顧客マスター (CUSTOMER-RECORD)
- **ファイル:** `CUSTREC.cpy` / `CVCUS01Y.cpy`
- **レコード長:** 500 バイト
- **構造:**
  - `CUST-ID` (PIC 9(09)): 顧客ID (主キー相当)
  - `CUST-FIRST-NAME` (PIC X(25)): 名
  - `CUST-MIDDLE-NAME` (PIC X(25)): ミドルネーム
  - `CUST-LAST-NAME` (PIC X(25)): 姓
  - `CUST-ADDR-LINE-1` ~ `3` (PIC X(50)): 住所
  - `CUST-ADDR-STATE-CD` (PIC X(02)): 州コード
  - `CUST-ADDR-COUNTRY-CD` (PIC X(03)): 国コード
  - `CUST-ADDR-ZIP` (PIC X(10)): 郵便番号
  - `CUST-PHONE-NUM-1` ~ `2` (PIC X(15)): 電話番号
  - `CUST-SSN` (PIC 9(09)): 社会保障番号
  - `CUST-GOVT-ISSUED-ID` (PIC X(20)): 政府発行ID
  - `CUST-DOB-YYYYMMDD` (PIC X(10)): 生年月日
  - `CUST-EFT-ACCOUNT-ID` (PIC X(10)): EFTアカウントID
  - `CUST-PRI-CARD-HOLDER-IND` (PIC X(01)): プライマリカードホルダーフラグ
  - `CUST-FICO-CREDIT-SCORE` (PIC 9(03)): FICOクレジットスコア

### 1.2 アカウントマスター (ACCOUNT-RECORD)
- **ファイル:** `CVACT01Y.cpy`
- **レコード長:** 300 バイト
- **構造:**
  - `ACCT-ID` (PIC 9(11)): アカウントID (主キー相当)
  - `ACCT-ACTIVE-STATUS` (PIC X(01)): アクティブステータス
  - `ACCT-CURR-BAL` (PIC S9(10)V99): 現在残高 (符号付き, 小数点以下2桁)
  - `ACCT-CREDIT-LIMIT` (PIC S9(10)V99): クレジットリミット
  - `ACCT-CASH-CREDIT-LIMIT` (PIC S9(10)V99): キャッシングリミット
  - `ACCT-OPEN-DATE` (PIC X(10)): 開設日
  - `ACCT-EXPIRAION-DATE` (PIC X(10)): 有効期限
  - `ACCT-REISSUE-DATE` (PIC X(10)): 再発行日
  - `ACCT-CURR-CYC-CREDIT` (PIC S9(10)V99): 今期クレジット
  - `ACCT-CURR-CYC-DEBIT` (PIC S9(10)V99): 今期デビット
  - `ACCT-ADDR-ZIP` (PIC X(10)): 郵便番号
  - `ACCT-GROUP-ID` (PIC X(10)): グループID

### 1.3 カードマスター (CARD-RECORD)
- **ファイル:** `CVACT02Y.cpy`
- **レコード長:** 150 バイト
- **構造:**
  - `CARD-NUM` (PIC X(16)): カード番号 (主キー相当)
  - `CARD-ACCT-ID` (PIC 9(11)): アカウントID (外部キー: ACCOUNT-RECORD)
  - `CARD-CVV-CD` (PIC 9(03)): CVVコード
  - `CARD-EMBOSSED-NAME` (PIC X(50)): エンボス名
  - `CARD-EXPIRAION-DATE` (PIC X(10)): 有効期限
  - `CARD-ACTIVE-STATUS` (PIC X(01)): アクティブステータス

### 1.4 カードクロスリファレンス (CARD-XREF-RECORD)
- **ファイル:** `CVACT03Y.cpy`
- **レコード長:** 50 バイト
- **構造:**
  - `XREF-CARD-NUM` (PIC X(16)): カード番号
  - `XREF-CUST-ID` (PIC 9(09)): 顧客ID
  - `XREF-ACCT-ID` (PIC 9(11)): アカウントID

## 2. VSAM ファイル分析 (Transaction & Others)

### 2.1 トランザクション履歴 (TRAN-RECORD / DALYTRAN-RECORD)
- **ファイル:** `CVTRA05Y.cpy`, `CVTRA06Y.cpy`
- **レコード長:** 350 バイト
- **構造:**
  - `TRAN-ID` (PIC X(16)): トランザクションID
  - `TRAN-TYPE-CD` (PIC X(02)): トランザクションタイプ
  - `TRAN-CAT-CD` (PIC 9(04)): カテゴリコード
  - `TRAN-SOURCE` (PIC X(10)): ソース
  - `TRAN-DESC` (PIC X(100)): 説明
  - `TRAN-AMT` (PIC S9(09)V99): 金額
  - `TRAN-MERCHANT-ID` (PIC 9(09)): 加盟店ID
  - `TRAN-MERCHANT-NAME` (PIC X(50)): 加盟店名
  - `TRAN-MERCHANT-CITY` (PIC X(50)): 加盟店都市
  - `TRAN-MERCHANT-ZIP` (PIC X(10)): 加盟店郵便番号
  - `TRAN-CARD-NUM` (PIC X(16)): カード番号
  - `TRAN-ORIG-TS` (PIC X(26)): トランザクション発生日時 (Timestamp)
  - `TRAN-PROC-TS` (PIC X(26)): トランザクション処理日時 (Timestamp)

### 2.2 トランザクションカテゴリバランス (TRAN-CAT-BAL-RECORD)
- **ファイル:** `CVTRA01Y.cpy`
- **レコード長:** 50 バイト
- **構造:**
  - `TRANCAT-ACCT-ID` (PIC 9(11)): アカウントID
  - `TRANCAT-TYPE-CD` (PIC X(02)): トランザクションタイプ
  - `TRANCAT-CD` (PIC 9(04)): カテゴリコード
  - `TRAN-CAT-BAL` (PIC S9(09)V99): バランス

### 2.3 ディスクロージャーグループ (DIS-GROUP-RECORD)
- **ファイル:** `CVTRA02Y.cpy`
- **レコード長:** 50 バイト
- **構造:**
  - `DIS-ACCT-GROUP-ID` (PIC X(10)): アカウントグループID
  - `DIS-TRAN-TYPE-CD` (PIC X(02)): トランザクションタイプ
  - `DIS-TRAN-CAT-CD` (PIC 9(04)): カテゴリコード
  - `DIS-INT-RATE` (PIC S9(04)V99): 金利

### 2.4 トランザクションタイプ (TRAN-TYPE-RECORD)
- **ファイル:** `CVTRA03Y.cpy`
- **レコード長:** 60 バイト
- **構造:**
  - `TRAN-TYPE` (PIC X(02)): トランザクションタイプ
  - `TRAN-TYPE-DESC` (PIC X(50)): 説明

### 2.5 トランザクションカテゴリタイプ (TRAN-CAT-RECORD)
- **ファイル:** `CVTRA04Y.cpy`
- **レコード長:** 60 バイト
- **構造:**
  - `TRAN-TYPE-CD` (PIC X(02)): トランザクションタイプ
  - `TRAN-CAT-CD` (PIC 9(04)): カテゴリコード
  - `TRAN-CAT-TYPE-DESC` (PIC X(50)): 説明

## 3. DB2 & IMS 定義分析

### 3.1 DB2: CARDDEMO.AUTHFRDS (不正検知・承認履歴)
- **DDL:** `AUTHFRDS.ddl`
- **キー:** `CARD_NUM`, `AUTH_TS`
- **主なカラム:**
  - `AUTH_TYPE`, `MESSAGE_TYPE`, `MESSAGE_SOURCE`
  - `TRANSACTION_AMT`, `APPROVED_AMT` (DECIMAL(12,2))
  - `MERCHANT_ID`, `MERCHANT_NAME`, `MERCHANT_CITY`
  - `AUTH_FRAUD` (CHAR(1)): 不正フラグ

### 3.2 DB2: CARDDEMO.TRANSACTION_TYPE
- **DDL:** `TRNTYPE.ddl`
- **キー:** `TR_TYPE`
- **カラム:** `TR_DESCRIPTION`

### 3.3 DB2: CARDDEMO.TRANSACTION_TYPE_CATEGORY
- **DDL:** `TRNTYCAT.ddl`
- **キー:** `TRC_TYPE_CODE`, `TRC_TYPE_CATEGORY`
- **外部キー:** `TRC_TYPE_CODE` -> `CARDDEMO.TRANSACTION_TYPE`

### 3.4 IMS DB: DBPAUTP0 (承認保留)
- **DBD:** `DBPAUTP0.dbd`
- **アクセス:** HIDAM, VSAM
- **セグメント:**
  1.  **PAUTSUM0 (ルート):**
      - `ACCNTID` (6バイト, Packed Decimal)
  2.  **PAUTDTL1 (子セグメント):**
      - `PAUT9CTS` (8バイト, Char)
- **関連性:** アカウントIDをルートとして、その下に複数の承認詳細（タイムスタンプ等）がぶら下がる階層構造。
