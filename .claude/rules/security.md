# Security Rules

## コミット前チェック（必須）

- [ ] ハードコードされたシークレットがない（APIキー、パスワード、トークン）
- [ ] ユーザー入力がバリデーションされている
- [ ] SQLインジェクション対策（パラメータ化クエリ）
- [ ] XSS対策（出力のサニタイズ）
- [ ] CSRF対策
- [ ] 認証・認可の確認

## シークレット管理

```typescript
// NG: ハードコード
const apiKey = 'sk-xxx'

// OK: 環境変数
import { env } from 'cloudflare:workers'
const apiKey = env.API_KEY

if (!apiKey) {
  throw new Error('API_KEY is not configured')
}
```

## パラメータ化クエリ

```typescript
// NG: 文字列結合
db.execute(`SELECT * FROM users WHERE id = '${userId}'`)

// OK: Drizzle ORM
db.select().from(users).where(eq(users.id, userId))
```

## 入力バリデーション

```typescript
import * as v from 'valibot'

const inputSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
})

// 使用
const validated = v.parse(inputSchema, userInput)
```

## 認証必須エンドポイント

```typescript
// protectedProcedureを使用
export const myRouter = o.router({
  sensitiveData: protectedProcedure
    .handler(({ context }) => {
      // context.session.userが保証される
    }),
})
```

## セキュリティ問題発見時

1. 作業を停止
2. security-reviewerエージェントを使用
3. クリティカルな問題を先に対処
4. 漏洩した認証情報をローテーション
5. 類似問題がないかコードベース全体をスキャン

## 追加の保護

- すべてのエンドポイントにレート制限
- エラーメッセージに機密情報を含めない
- 監査ログを記録
