# プラン: ビジネスロジックの完全移植

## フェーズ 1: コピーブック定義のドメインモデルへの反映 [checkpoint: e8d1b9c]
COBOLのコピーブックで定義されているバリデーションルールやデータ型を、JavaのValidationアノテーションやValue Objectとして実装します。

- [x] **タスク 1:** 共通バリデーションロジックの移植 (入力値チェック)。 33fe9a9
- [x] **タスク 2:** 計算ロジックの移植 (利息計算、手数料計算)。 97728fd
- [ ] **タスク: Conductor - User Manual Verification**

## フェーズ 2: バッチ処理の移植
夜間バッチなどの非同期処理を Spring Batch 等で実装します。

- [ ] **タスク 1:** アカウント更新バッチ (CBACT*) の移植。
- [ ] **タスク 2:** 取引集計バッチ (CBTRN*) の移植。
- [ ] **タスク: Conductor - User Manual Verification**
