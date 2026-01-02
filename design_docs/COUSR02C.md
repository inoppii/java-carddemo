# 詳細設計書: COUSR02C (User Update)

## 1. 処理概要
既存ユーザーの情報を更新する。パスワードや権限の変更が可能。

## 2. 入出力定義
- **ファイル:** `USRSEC` (REWRITE)

## 3. 処理フロー
1. `EXEC CICS READ UPDATE` による取得。
2. 変更内容の反映。
3. `EXEC CICS REWRITE` による更新。
