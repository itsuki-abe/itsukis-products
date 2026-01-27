# Design Patterns

## APIレスポンス形式

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    page?: number
    total?: number
    timestamp?: string
  }
}

// 成功
{
  success: true,
  data: result,
  meta: { timestamp: new Date().toISOString() }
}

// エラー
{
  success: false,
  error: 'エラーメッセージ'
}
```

## カスタムフック: useDebounce

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

## リポジトリパターン

```typescript
interface Repository<T> {
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(data: Omit<T, 'id'>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}
```

## oRPCプロシージャパターン

```typescript
// 認証不要
const publicProcedure = o

// 認証必須
const protectedProcedure = o.use(requireAuth)

// 組織メンバー必須
const orgMemberProcedure = protectedProcedure.use(requireOrgMember)
```

## エラーハンドリングパターン

```typescript
// oRPCエラー
throw new ORPCError('BAD_REQUEST', {
  message: 'Invalid input',
})

// カスタムエラークラス
class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode = 400
  ) {
    super(message)
  }
}
```

## スケルトンプロジェクト

新機能実装時:

1. 類似の実績あるプロジェクトを検索
2. パターンを分析
3. 最適なものを基盤として活用
