# Coding Style Rules

## イミュータビリティ（最重要）

**常に新しいオブジェクトを作成し、既存のものを変更しない。**

```typescript
// NG
user.name = 'New Name'
items.push(newItem)

// OK
const updatedUser = { ...user, name: 'New Name' }
const newItems = [...items, newItem]
```

## ファイル構成

- 少数の大きなファイルより多数の小さなファイル
- 高凝集・低結合を目指す
- サイズ目安: 200-400行（標準）、800行（上限）
- 機能/ドメイン単位で整理

## エラーハンドリング

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  // ユーザーフレンドリーなメッセージ
  console.error('Operation failed:', error)
  throw new Error('操作に失敗しました')
}
```

## 入力バリデーション

Valibotで必ずバリデーション:

```typescript
import * as v from 'valibot'

const schema = v.object({
  email: v.pipe(v.string(), v.email()),
  age: v.pipe(v.number(), v.minValue(0)),
})
```

## 完成前チェックリスト

- [ ] 可読性が高いか
- [ ] 変数名は説明的か
- [ ] 関数は50行以下か
- [ ] ファイルは800行以下か
- [ ] ネストは4段階以下か
- [ ] エラーハンドリングがあるか
- [ ] console.logが残っていないか
- [ ] ハードコードされた値がないか
- [ ] イミュータブルパターンを使用しているか
