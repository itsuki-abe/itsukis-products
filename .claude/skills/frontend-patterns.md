# Frontend Patterns

TanStack Start + React + TailwindCSSのフロントエンドパターン。

## コンポーネントパターン

### Compound Components

```typescript
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border bg-card p-4">{children}</div>
)

Card.Header = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b pb-2 font-semibold">{children}</div>
)

Card.Body = ({ children }: { children: React.ReactNode }) => (
  <div className="py-4">{children}</div>
)

// 使用
<Card>
  <Card.Header>タイトル</Card.Header>
  <Card.Body>コンテンツ</Card.Body>
</Card>
```

### Render Props

```typescript
interface RenderProps<T> {
  data: T
  isLoading: boolean
  error: Error | null
}

function DataFetcher<T>({
  url,
  children,
}: {
  url: string
  children: (props: RenderProps<T>) => React.ReactNode
}) {
  const { data, isLoading, error } = useQuery({ queryKey: [url] })
  return <>{children({ data, isLoading, error })}</>
}
```

## カスタムフック

### useToggle

```typescript
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return { value, toggle, setTrue, setFalse }
}
```

### useAsync

```typescript
function useAsync<T>(asyncFn: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<{
    data: T | null
    loading: boolean
    error: Error | null
  }>({ data: null, loading: true, error: null })

  useEffect(() => {
    setState(s => ({ ...s, loading: true }))
    asyncFn()
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error }))
  }, deps)

  return state
}
```

## TanStack Start固有

### ルート定義

```typescript
// routes/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  beforeLoad: async ({ context }) => {
    // 認証チェック
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
})

function Dashboard() {
  return <div>Dashboard</div>
}
```

### Server Functions

```typescript
// functions/get-user.ts
import { createServerFn } from '@tanstack/start'

export const getUser = createServerFn('GET', async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })
  return user
})
```

## oRPC + TanStack Query

```typescript
import { orpc } from '@/utils/orpc'

// クエリ
function TodoList() {
  const { data, isLoading } = orpc.todo.list.useQuery()

  if (isLoading) return <Skeleton />
  return <ul>{data?.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
}

// ミューテーション
function CreateTodo() {
  const mutation = orpc.todo.create.useMutation()

  const handleSubmit = async (title: string) => {
    await mutation.mutateAsync({ title })
  }
}
```

## TailwindCSS + cn()

```typescript
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  className?: string
}

function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md px-4 py-2 font-medium',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        className
      )}
      {...props}
    />
  )
}
```

## パフォーマンス

### メモ化

```typescript
// 高コストな計算
const expensiveResult = useMemo(() => {
  return items.filter(item => item.active).map(item => transform(item))
}, [items])

// コールバック
const handleClick = useCallback((id: string) => {
  setSelected(id)
}, [])

// コンポーネント
const MemoizedItem = memo(function Item({ data }: { data: ItemData }) {
  return <div>{data.name}</div>
})
```

### Code Splitting

```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## フォーム（TanStack Form）

```typescript
import { useForm } from '@tanstack/react-form'

function LoginForm() {
  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(value)
    },
  })

  return (
    <form onSubmit={e => { e.preventDefault(); form.handleSubmit() }}>
      <form.Field name="email">
        {field => <Input {...field} type="email" />}
      </form.Field>
    </form>
  )
}
```

## エラーバウンダリ

```typescript
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}
```
