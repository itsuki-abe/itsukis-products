# /update-docs

ドキュメントを更新するコマンド。

## 実行手順

1. **package.json分析**
   - 利用可能なスクリプトを抽出
   - 説明を追加

2. **環境変数カタログ**
   - `.env.example`から変数を抽出
   - 目的と形式を記載

3. **コントリビュートガイド作成**
```markdown
# CONTRIB.md

## 開発環境セットアップ
1. `bun install`
2. 環境変数設定
3. `bun run dev`

## 利用可能なコマンド
- `bun run dev:web` - フロントエンド開発
- `bun run dev:server` - API開発
- ...

## コーディング規約
- ...

## PRプロセス
- ...
```

4. **運用手順書作成**
```markdown
# RUNBOOK.md

## デプロイ
1. `bun run build`
2. `bun run deploy`

## 監視
- ...

## トラブルシューティング
- ...

## 復旧手順
- ...
```

5. **陳腐化検出**
   - 90日以上更新されていないドキュメント
   - 削除または更新が必要なファイル

6. **変更サマリー**
```markdown
## ドキュメント更新

### 更新
- `docs/CONTRIB.md`
- `docs/RUNBOOK.md`

### 陳腐化の疑い
- `docs/old-feature.md` - 90日以上未更新
```

## 原則

- `package.json`と`.env.example`が信頼できる情報源
- 実際のコードと一致させる
- 定期的に陳腐化をチェック
