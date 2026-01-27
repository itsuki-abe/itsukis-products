# Backend Patterns

Hono + oRPC + Drizzle ORMのバックエンドパターン。

## oRPC パターン

### ルーター定義

```typescript
// packages/pagedeck/api/src/routers/todo.ts
import { o, protectedProcedure, publicProcedure } from '../index'
import { db } from '@itsukis-products/pagedeck-db'
import { todos } from '@itsukis-products/pagedeck-db/schema/todo'
import * as v from 'valibot'
import { eq } from 'drizzle-orm'

export const todoRouter = o.router({
  // 認証不要
  health: publicProcedure.handler(() => ({ status: 'ok' })),

  // 認証必須
  list: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session.user.id
    return db.select().from(todos).where(eq(todos.userId, userId))
  }),

  // 入力バリデーション付き
  create: protectedProcedure
    .input(v.object({
      title: v.pipe(v.string(), v.minLength(1), v.maxLength(200)),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id
      return db.insert(todos).values({
        id: uuidv7(),
        title: input.title,
        userId,
        createdAt: new Date(),
      }).returning()
    }),

  // 更新
  update: protectedProcedure
    .input(v.object({
      id: v.string(),
      title: v.optional(v.string()),
      completed: v.optional(v.boolean()),
    }))
    .handler(async ({ input, context }) => {
      const { id, ...data } = input
      return db.update(todos)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(todos.id, id))
        .returning()
    }),

  // 削除
  delete: protectedProcedure
    .input(v.object({ id: v.string() }))
    .handler(async ({ input }) => {
      await db.delete(todos).where(eq(todos.id, input.id))
      return { success: true }
    }),
})
```

### Context

```typescript
// packages/pagedeck/api/src/context.ts
import { auth } from '@itsukis-products/pagedeck-auth'
import type { Context as HonoContext } from 'hono'

export type Context = {
  session: Awaited<ReturnType<typeof auth.api.getSession>> | null
}

export async function createContext({ context }: { context: HonoContext }): Promise<Context> {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  })
  return { session }
}
```

## Drizzle ORM パターン

### スキーマ定義

```typescript
// packages/pagedeck/db/src/schema/todo.ts
import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: uuid('id').primaryKey(),
  title: text('title').notNull(),
  completed: boolean('completed').default(false).notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
```

### リレーション

```typescript
import { relations } from 'drizzle-orm'

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
  organizations: many(members),
}))

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}))
```

### クエリパターン

```typescript
// Select with relations
const userWithTodos = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: { todos: true },
})

// Transaction
await db.transaction(async (tx) => {
  await tx.insert(orders).values(orderData)
  await tx.update(inventory).set({ quantity: sql`quantity - 1` })
})
```

## Hono ミドルウェア

### CORSとロガー

```typescript
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { env } from 'cloudflare:workers'

const app = new Hono()

app.use(logger())
app.use('/*', cors({
  origin: env.CORS_ORIGIN,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))
```

### エラーハンドリング

```typescript
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({
    success: false,
    error: env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message,
  }, 500)
})
```

## 認証パターン（Better Auth）

### 認証チェック

```typescript
// protectedProcedure（推奨）
const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError('UNAUTHORIZED')
  }
  return next({ context: { session: context.session } })
})

export const protectedProcedure = publicProcedure.use(requireAuth)
```

### 組織（Organization）対応

```typescript
const requireOrgMember = o.middleware(async ({ context, input, next }) => {
  const { organizationId } = input
  const userId = context.session.user.id

  const member = await db.query.members.findFirst({
    where: and(
      eq(members.organizationId, organizationId),
      eq(members.userId, userId)
    ),
  })

  if (!member) {
    throw new ORPCError('FORBIDDEN')
  }

  return next({ context: { ...context, member } })
})
```

## レスポンス形式

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
return {
  success: true,
  data: result,
  meta: { timestamp: new Date().toISOString() }
}

// エラー
throw new ORPCError('BAD_REQUEST', { message: 'Invalid input' })
```

## 環境変数アクセス

```typescript
// Cloudflare Workers
import { env } from 'cloudflare:workers'

const dbUrl = env.DB.connectionString
const secret = env.BETTER_AUTH_SECRET
```
