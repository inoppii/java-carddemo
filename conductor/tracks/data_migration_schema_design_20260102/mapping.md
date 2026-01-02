# データマッピングドキュメント

## 1. 顧客・アカウント・カード

### 1.1 顧客 (Customer)
| Source (VSAM) | Field | Type | Target (PostgreSQL) | Column | Type | Notes |
|---|---|---|---|---|---|---|
| CUSTREC | CUST-ID | PIC 9(09) | customer | cust_id | INTEGER | PK |
| CUSTREC | CUST-FIRST-NAME | PIC X(25) | customer | first_name | VARCHAR(25) | |
| CUSTREC | CUST-MIDDLE-NAME | PIC X(25) | customer | middle_name | VARCHAR(25) | |
| CUSTREC | CUST-LAST-NAME | PIC X(25) | customer | last_name | VARCHAR(25) | |
| CUSTREC | CUST-ADDR-LINE-1 | PIC X(50) | customer | addr_line_1 | VARCHAR(50) | |
| CUSTREC | CUST-ADDR-LINE-2 | PIC X(50) | customer | addr_line_2 | VARCHAR(50) | |
| CUSTREC | CUST-ADDR-LINE-3 | PIC X(50) | customer | addr_line_3 | VARCHAR(50) | |
| CUSTREC | CUST-ADDR-STATE-CD | PIC X(02) | customer | addr_state_cd | VARCHAR(2) | |
| CUSTREC | CUST-ADDR-COUNTRY-CD | PIC X(03) | customer | addr_country_cd | VARCHAR(3) | |
| CUSTREC | CUST-ADDR-ZIP | PIC X(10) | customer | addr_zip | VARCHAR(10) | |
| CUSTREC | CUST-PHONE-NUM-1 | PIC X(15) | customer | phone_num_1 | VARCHAR(15) | |
| CUSTREC | CUST-PHONE-NUM-2 | PIC X(15) | customer | phone_num_2 | VARCHAR(15) | |
| CUSTREC | CUST-SSN | PIC 9(09) | customer | ssn | INTEGER | |
| CUSTREC | CUST-GOVT-ISSUED-ID | PIC X(20) | customer | govt_issued_id | VARCHAR(20) | |
| CUSTREC | CUST-DOB-YYYYMMDD | PIC X(10) | customer | dob | DATE | YYYY-MM-DD変換 |
| CUSTREC | CUST-EFT-ACCOUNT-ID | PIC X(10) | customer | eft_account_id | VARCHAR(10) | |
| CUSTREC | CUST-PRI-CARD-HOLDER-IND | PIC X(01) | customer | pri_card_holder_ind | CHAR(1) | |
| CUSTREC | CUST-FICO-CREDIT-SCORE | PIC 9(03) | customer | fico_credit_score | INTEGER | |

### 1.2 アカウント (Account)
| Source (VSAM) | Field | Type | Target (PostgreSQL) | Column | Type | Notes |
|---|---|---|---|---|---|---|
| CVACT01Y | ACCT-ID | PIC 9(11) | account | acct_id | BIGINT | PK |
| CVACT01Y | ACCT-ACTIVE-STATUS | PIC X(01) | account | active_status | CHAR(1) | |
| CVACT01Y | ACCT-CURR-BAL | PIC S9(10)V99 | account | curr_bal | NUMERIC(12, 2) | |
| CVACT01Y | ACCT-CREDIT-LIMIT | PIC S9(10)V99 | account | credit_limit | NUMERIC(12, 2) | |
| CVACT01Y | ACCT-CASH-CREDIT-LIMIT | PIC S9(10)V99 | account | cash_credit_limit | NUMERIC(12, 2) | |
| CVACT01Y | ACCT-OPEN-DATE | PIC X(10) | account | open_date | DATE | |
| CVACT01Y | ACCT-EXPIRAION-DATE | PIC X(10) | account | expiration_date | DATE | |
| CVACT01Y | ACCT-REISSUE-DATE | PIC X(10) | account | reissue_date | DATE | |
| CVACT01Y | ACCT-CURR-CYC-CREDIT | PIC S9(10)V99 | account | curr_cyc_credit | NUMERIC(12, 2) | |
| CVACT01Y | ACCT-CURR-CYC-DEBIT | PIC S9(10)V99 | account | curr_cyc_debit | NUMERIC(12, 2) | |
| CVACT01Y | ACCT-ADDR-ZIP | PIC X(10) | account | addr_zip | VARCHAR(10) | |
| CVACT01Y | ACCT-GROUP-ID | PIC X(10) | account | group_id | VARCHAR(10) | |

### 1.3 カード (Card)
| Source (VSAM) | Field | Type | Target (PostgreSQL) | Column | Type | Notes |
|---|---|---|---|---|---|---|
| CVACT02Y | CARD-NUM | PIC X(16) | card | card_num | VARCHAR(16) | PK |
| CVACT02Y | CARD-ACCT-ID | PIC 9(11) | card | acct_id | BIGINT | FK -> account |
| CVACT02Y | CARD-CVV-CD | PIC 9(03) | card | cvv_cd | INTEGER | |
| CVACT02Y | CARD-EMBOSSED-NAME | PIC X(50) | card | embossed_name | VARCHAR(50) | |
| CVACT02Y | CARD-EXPIRAION-DATE | PIC X(10) | card | expiration_date | DATE | |
| CVACT02Y | CARD-ACTIVE-STATUS | PIC X(01) | card | active_status | CHAR(1) | |

## 2. トランザクション・その他

### 2.1 トランザクション履歴 (Transaction History)
| Source (VSAM) | Field | Type | Target (PostgreSQL) | Column | Type | Notes |
|---|---|---|---|---|---|---|
| CVTRA05Y | TRAN-ID | PIC X(16) | transaction_history | tran_id | VARCHAR(16) | PK |
| CVTRA05Y | TRAN-TYPE-CD | PIC X(02) | transaction_history | tran_type_cd | VARCHAR(2) | |
| CVTRA05Y | TRAN-CAT-CD | PIC 9(04) | transaction_history | tran_cat_cd | INTEGER | |
| CVTRA05Y | TRAN-SOURCE | PIC X(10) | transaction_history | source | VARCHAR(10) | |
| CVTRA05Y | TRAN-DESC | PIC X(100) | transaction_history | description | VARCHAR(100) | |
| CVTRA05Y | TRAN-AMT | PIC S9(09)V99 | transaction_history | amount | NUMERIC(11, 2) | |
| CVTRA05Y | TRAN-MERCHANT-ID | PIC 9(09) | transaction_history | merchant_id | INTEGER | |
| CVTRA05Y | TRAN-MERCHANT-NAME | PIC X(50) | transaction_history | merchant_name | VARCHAR(50) | |
| CVTRA05Y | TRAN-MERCHANT-CITY | PIC X(50) | transaction_history | merchant_city | VARCHAR(50) | |
| CVTRA05Y | TRAN-MERCHANT-ZIP | PIC X(10) | transaction_history | merchant_zip | VARCHAR(10) | |
| CVTRA05Y | TRAN-CARD-NUM | PIC X(16) | transaction_history | card_num | VARCHAR(16) | FK -> card |
| CVTRA05Y | TRAN-ORIG-TS | PIC X(26) | transaction_history | orig_ts | TIMESTAMP | |
| CVTRA05Y | TRAN-PROC-TS | PIC X(26) | transaction_history | proc_ts | TIMESTAMP | |

### 2.2 不正検知 (Auth Fraud)
| Source (DB2) | Field | Type | Target (PostgreSQL) | Column | Type | Notes |
|---|---|---|---|---|---|---|
| AUTHFRDS | CARD_NUM | CHAR(16) | auth_fraud | card_num | VARCHAR(16) | PK |
| AUTHFRDS | AUTH_TS | TIMESTAMP | auth_fraud | auth_ts | TIMESTAMP | PK |
| AUTHFRDS | TRANSACTION_AMT | DECIMAL(12,2) | auth_fraud | transaction_amt | NUMERIC(12, 2) | |
| AUTHFRDS | AUTH_FRAUD | CHAR(1) | auth_fraud | auth_fraud | CHAR(1) | |

### 2.3 トランザクションタイプ (Transaction Type)
| Source (VSAM/DB2) | Field | Type | Target (PostgreSQL) | Column | Type | Notes |
|---|---|---|---|---|---|---|
| CVTRA03Y | TRAN-TYPE | PIC X(02) | transaction_type | tran_type_cd | VARCHAR(2) | PK |
| CVTRA03Y | TRAN-TYPE-DESC | PIC X(50) | transaction_type | description | VARCHAR(50) | |
