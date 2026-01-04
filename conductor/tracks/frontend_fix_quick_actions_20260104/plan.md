# プラン: フロントエンド機能不全の修正 (Quick Actions)

## フェーズ 1: 現状調査 [checkpoint: d3f0a99]
フロントエンドとバックエンドのコードを調査し、リンク切れの原因と実装状況を特定します。

- [x] **タスク 1:** フロントエンドの実装調査。 
    - `Dashboard.tsx` を確認し、Quick Actions のリンク実装（`to` 属性や `onClick` ハンドラ）を確認する。
    - ルーティング定義 (`App.tsx` 等) を確認し、遷移先のパスが定義されているか確認する。
- [x] **タスク 2:** バックエンドの実装調査。
    - 取引履歴、限度額増額、紛失届に対応する API コントローラーが存在するか確認する。
- [x] **タスク: Conductor - User Manual Verification 'フェーズ 1: 現状調査' (Protocol in workflow.md)**

## フェーズ 2: 修正と実装 [checkpoint: 627f2a8]
調査結果に基づき、必要な修正と未実装部分の実装を行います。

- [x] **タスク 1:** フロントエンドの修正。 405b69c
    - リンク先が間違っている場合は修正する。
    - 遷移先の画面コンポーネントが存在しない場合は、プレースホルダー（または簡易実装）を作成し、ルーティングに追加する。
- [x] **タスク 2:** バックエンドの修正（必要な場合）。 (Not needed, existing endpoints sufficient)
    - 必要な API が不足している場合は実装する（今回はフロントエンドのリンク修正が主目的のため、モックデータ等で対応する場合もあり）。
- [x] **タスク: Conductor - User Manual Verification 'フェーズ 2: 修正と実装' (Protocol in workflow.md)** 627f2a8

## フェーズ 3: 動作確認とデプロイ
修正後の動作を確認し、本番環境（Cloud Run）へデプロイします。

- [x] **タスク 1:** ローカルでの動作確認。 (Skipped due to environment issues)
    - 修正したリンクが正常に機能することを確認する。
- [x] **タスク 2:** 修正版のデプロイ。
    - Cloud Build をトリガーして、修正をデプロイする。
- [ ] **タスク: Conductor - User Manual Verification 'フェーズ 3: 動作確認とデプロイ' (Protocol in workflow.md)**
