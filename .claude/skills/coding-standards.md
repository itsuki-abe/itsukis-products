# Coding Standards & Best Practices

TypeScript/React/Node.js開発の標準規約。

## 基本原則

1. **可読性優先**: コードは書くより読む方が多い。自己文書化を心がける
2. **KISS**: シンプルな解決策を選ぶ
3. **DRY**: 重複を避け、再利用可能なロジックを抽出
4. **YAGNI**: 現在必要なものだけを構築

## 命名規則

### 変数
```typescript
// camelCase、説明的な名前
const marketSearchQuery = '...'
const isAuthenticated = true
const userList = []
```

### 関数
```typescript
// 動詞 + 名詞パターン
function fetchMarketData() {}
function validateUserInput() {}
function createTodo() {}
```

### コンポーネント
```typescript
// PascalCase
function UserProfile() {}
function MarketCard() {}
```

### 定数
```typescript
// UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3
const API_BASE_URL = '...'
```

## イミュータビリティ

**必須**: オブジェクトを直接変更しない。常に新しいオブジェクトを作成。

```typescript
// NG
user.name = 'New Name'

// OK
const updatedUser = { ...user, name: 'New Name' }

// 配列
// NG
items.push(newItem)

// OK
const newItems = [...items, newItem]
```

## エラーハンドリング

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  // ユーザーフレンドリーなメッセージ
  console.error('Operation failed:', error)
  throw new Error('操作に失敗しました。再度お試しください。')
}
```

## 入力バリデーション（Valibot）

```typescript
import * as v from 'valibot'

const createUserSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  name: v.pipe(v.string(), v.minLength(1), v.maxLength(100)),
  age: v.pipe(v.number(), v.minValue(0), v.maxValue(150)),
})

// 使用
const validated = v.parse(createUserSchema, input)
```

## React パターン

### 関数コンポーネント

```typescript
interface UserCardProps {
  user: User
  onSelect: (id: string) => void
}

export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div onClick={() => onSelect(user.id)}>
      {user.name}
    </div>
  )
}
```

### カスタムフック

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

### 状態更新（関数形式）

```typescript
// NG: 古いstateを参照する可能性
setCount(count + 1)

// OK: 最新のstateを使用
setCount(prev => prev + 1)
```

## ファイル構成

```
src/
  components/
    ui/           # 汎用UIコンポーネント
    forms/        # フォームコンポーネント
    layouts/      # レイアウトコンポーネント
  hooks/          # カスタムフック
  utils/          # ユーティリティ関数
  types/          # 型定義
```

## サイズ制限

- **関数**: 50行以下
- **ファイル**: 200-400行が標準、800行が上限
- **ネスト**: 4段階以下

## コードスメル

- [ ] 50行を超える関数
- [ ] 4段階を超えるネスト
- [ ] マジックナンバー
- [ ] 重複コード
- [ ] 長いパラメータリスト
- [ ] console.logの残存
