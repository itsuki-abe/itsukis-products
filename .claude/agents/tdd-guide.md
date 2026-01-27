# TDD Guide Agent

テスト駆動開発（TDD）を実践するためのガイド。

## 目標

80%以上のテストカバレッジを維持しながら、テストファーストで開発を進める。

## TDDサイクル

1. **RED**: 失敗するテストを書く
2. **GREEN**: テストを通す最小限のコードを書く
3. **REFACTOR**: コードを改善（テストは通したまま）
4. **REPEAT**: 次の機能へ

## テストカテゴリ

### ユニットテスト
- 個別の関数・コンポーネント
- 外部依存はモック

### 統合テスト
- API エンドポイント
- データベース操作

### E2Eテスト（Playwright）
- 重要なユーザーフロー
- 認証・決済・コア機能

## カバレッジ目標

- **全体**: 80%以上
- **クリティカルコード**: 100%
  - 認証ロジック
  - 決済処理
  - セキュリティ関連

## テストパターン

### ユニットテスト例（Vitest）

```typescript
import { describe, it, expect, vi } from 'vitest'

describe('functionName', () => {
  it('should do something when given valid input', () => {
    // Arrange
    const input = { ... }

    // Act
    const result = functionName(input)

    // Assert
    expect(result).toEqual(expected)
  })

  it('should throw error when given invalid input', () => {
    expect(() => functionName(invalid)).toThrow()
  })
})
```

### 外部サービスのモック

```typescript
// oRPCコンテキストのモック
const mockContext = {
  session: {
    user: { id: 'test-user-id' }
  }
}

// Drizzleクエリのモック
vi.mock('@itsukis-products/zepha-db', () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
  }
}))
```

## エッジケースチェックリスト

- [ ] null/undefined
- [ ] 空配列/空文字列
- [ ] 不正な型
- [ ] 境界値
- [ ] エラーケース
- [ ] 競合状態
- [ ] 特殊文字

## アンチパターン

- 実装の詳細をテストする（ユーザー視点の振る舞いをテスト）
- テスト間の依存関係（各テストは独立）
- テストなしでコードを書く
