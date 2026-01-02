# 詳細設計書: CSUTLDTC (Date Validation Utility)

## 1. 処理概要
入力された日付文字列が指定されたフォーマットに従っているかを検証し、妥当性チェックの結果を返す共通ユーティリティプログラム。内部で IBM Z/OS 共通ランタイムの日付サービス `CEEDAYS` を呼び出す。

## 2. 入出力定義
- **Linkage Section (引数):**
    - `LS-DATE` (PIC X(10)): 検証対象の日付文字列。
    - `LS-DATE-FORMAT` (PIC X(10)): 日付の形式（例: 'YYYY-MM-DD'）。
    - `LS-RESULT` (PIC X(80)): 実行結果メッセージとステータスコードを格納して返す。
- **戻り値 (RETURN-CODE):**
    - `WS-SEVERITY-N`: 深刻度コード (0=正常, その他=エラー)。

## 3. 処理フロー
1. 入力パラメータ (`LS-DATE`, `LS-DATE-FORMAT`) を `CEEDAYS` API 用の可変長文字列構造 (`Vstring`) へ転記。
2. `CEEDAYS` API を呼び出し、日付の検証と Lilian 形式への変換を試みる。
3. `CEEDAYS` から返却されたフィードバックコード (`FEEDBACK-CODE`) を判定。
    - 正常 (FC-INVALID-DATE ※名称が紛らわしいがバイナリ 0 を判定): `Date is valid` をセット。
    - 各種エラー (未入力、無効な値、無効な月、非数値データ等): 対応する日本語/英語メッセージをセット。
4. 結果メッセージを `LS-RESULT` へセットし、深刻度を `RETURN-CODE` にセットして終了。

## 4. 依存関係
- **CEEDAYS:** IBM Language Environment Callable Service.

## 5. 移行への考慮事項
- **標準ライブラリの利用:** 移行先の Node.js (date-fns, moment, luxon) や Java (java.time) には、より強力で柔軟な日付検証機能が標準で備わっている。
- **API の置き換え:** `CEEDAYS` 特有の Lilian 形式変換が必要なロジックが他にあるか確認が必要。単なる妥当性チェックであれば、移行先の標準関数で完全に代替可能。
- **エラーコードの互換性:** 呼び出し元のプログラムが特定の `LS-RESULT` 文字列や `RETURN-CODE` を判定している場合、移行先でも同様の戻り値インターフェースを維持する必要がある。
