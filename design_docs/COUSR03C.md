# 詳細設計書: COUSR03C (User Delete)

## 1. 処理概要
指定されたユーザーをセキュリティファイルから削除する。

## 2. 入出力定義
- **ファイル:** `USRSEC` (DELETE)

## 3. 処理フロー
1. 確認画面の表示。
2. `EXEC CICS DELETE` の実行。
