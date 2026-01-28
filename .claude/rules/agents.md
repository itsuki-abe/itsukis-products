# Agent Orchestration Rules

## 利用可能なエージェント

`~/.claude/agents/`に格納:

| エージェント | 用途 |
|-------------|------|
| planner | 実装計画策定 |
| architect | アーキテクチャ設計 |
| tdd-guide | テスト駆動開発 |
| code-reviewer | コードレビュー |
| security-reviewer | セキュリティ分析 |
| build-error-resolver | ビルドエラー修正 |
| e2e-runner | E2Eテスト |
| refactor-cleaner | デッドコード削除 |
| doc-updater | ドキュメント更新 |

## 即時使用トリガー

ユーザーの指示なしで使用:

| 状況 | エージェント |
|------|-------------|
| 複雑な機能リクエスト | planner |
| アーキテクチャ決定 | architect |
| 新機能実装 | tdd-guide |
| コード完成後 | code-reviewer |
| セキュリティ懸念 | security-reviewer |
| ビルド失敗 | build-error-resolver |

## 並列実行

独立した操作は同時に実行:

```
// 並列実行
- セキュリティ分析
- パフォーマンスレビュー
- 型チェック

// 直列実行（依存関係あり）
1. 計画作成
2. 実装
3. レビュー
```

## マルチパースペクティブ分析

複雑な問題には複数のサブエージェントを使用:

- 事実レビュアー
- シニアエンジニア
- セキュリティ専門家
- 一貫性チェッカー
- 冗長性チェッカー

## エージェント選択ガイド

### 計画フェーズ
- 新機能 → planner
- アーキテクチャ変更 → architect

### 実装フェーズ
- TDD → tdd-guide
- ビルドエラー → build-error-resolver

### 検証フェーズ
- コード品質 → code-reviewer
- セキュリティ → security-reviewer
- E2E → e2e-runner

### メンテナンスフェーズ
- クリーンアップ → refactor-cleaner
- ドキュメント → doc-updater
