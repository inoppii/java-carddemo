# 詳細設計書: CBIMPORT (Data Import Utility)

## 1. 処理概要
外部からのデータを VSAM ファイルへインポート（一括登録）するユーティリティ。

## 2. 入出力定義
- **入力ファイル:** Sequential データ
- **出力ファイル:** VSAM ファイル

## 3. 処理フロー
1. 入力データの読み込み。
2. VSAM キーの生成または抽出。
3. `EXEC CICS WRITE` またはバッチ `WRITE` による登録。
