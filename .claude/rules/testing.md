# Testing Rules

## 必須要件

- **最小カバレッジ**: 80%
- **テストタイプ**:
  - ユニットテスト: 個別関数・コンポーネント
  - 統合テスト: API・DB操作
  - E2Eテスト: Playwrightで重要フロー

## TDDワークフロー

1. **RED**: テストを書く（失敗する）
2. **GREEN**: 最小限のコードで通す
3. **REFACTOR**: コードを改善
4. **カバレッジ確認**: 80%以上を維持

## テストパターン（AAA）

```typescript
describe('functionName', () => {
  it('should do something when given valid input', () => {
    // Arrange（準備）
    const input = { ... }

    // Act（実行）
    const result = functionName(input)

    // Assert（検証）
    expect(result).toEqual(expected)
  })
})
```

## エッジケース

必ずテストする:
- null/undefined
- 空配列/空文字列
- 不正な型
- 境界値
- エラーケース
- 特殊文字

## テスト失敗時

1. テストの分離を確認
2. モックの正確性を確認
3. 通常はテストではなく実装を修正

## エージェント

- **tdd-guide**: 新機能開発時に使用（TDDを強制）
- **e2e-runner**: Playwrightテストの専門家

## アンチパターン

- 実装の詳細をテスト（振る舞いをテストする）
- テスト間の依存（各テストは独立）
- テストなしでコードを書く
