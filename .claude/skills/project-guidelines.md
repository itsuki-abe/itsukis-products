# Project Guidelines - PageDeck

プロジェクト固有のガイドライン。

## プロジェクト概要

マルチテナント対応のSaaSアプリケーション。

## 技術スタック

### フロントエンド
- React 19
- TanStack Start（TanStack Router）
- TailwindCSS v4
- Shadcn/UI + Radix UI

### バックエンド
- Hono（APIフレームワーク）
- oRPC（型安全なRPC）
- Drizzle ORM v1 beta
- CockroachDB + Cloudflare HyperDrive
- Better Auth（認証）

### 共通
- Cloudflare Workers（デプロイ先）
- Alchemy.run（IaC）
- Bun Workspace + Turborepo
- Biome（Linter/Formatter）

## ディレクトリ構造

```
apps/
  pagedeck/
    web/          # フロントエンド（TanStack Start）
    server/       # APIサーバー（Hono + oRPC）

packages/
  common/
    config/       # 共通設定
  pagedeck/
    api/          # oRPCのルーター・プロシージャ定義
    auth/         # Better Auth設定
    db/           # Drizzle ORMスキーマ・クライアント
    ui/           # Shadcn/UIコンポーネント
```

## 開発コマンド

```bash
# 開発サーバー
bun run dev:web       # フロントエンド
bun run dev:server    # APIサーバー

# データベース
bun run db:push       # スキーマをDBに反映
bun run db:studio     # Drizzle Studio
bun run db:generate   # マイグレーション生成
bun run db:migrate    # マイグレーション実行

# ビルド・デプロイ
bun run build         # 全パッケージビルド
bun run deploy        # Alchemyでデプロイ
bun run check-types   # 型チェック
bun run check         # Biomeでフォーマット・Lint
```

## パッケージ依存関係

```
@itsukis-products/pagedeck-db
       ↓
@itsukis-products/pagedeck-auth
       ↓
@itsukis-products/pagedeck-api
       ↓
apps/pagedeck/server, apps/pagedeck/web
```

## 重要な規約

### ID生成
```typescript
import { uuidv7 } from 'uuidv7'
const id = uuidv7()
```

### 環境変数
```typescript
import { env } from 'cloudflare:workers'
const value = env.MY_VAR
```

### 認証
```typescript
// 認証必須エンドポイント
protectedProcedure.handler(({ context }) => {
  const user = context.session.user
})
```

### バリデーション
```typescript
import * as v from 'valibot'
const schema = v.object({ ... })
```

### スタイリング
```typescript
import { cn } from '@/lib/utils'
<div className={cn('base', condition && 'conditional')} />
```

## Git規約

### コミットメッセージ
```
feat: 新機能
fix: バグ修正
docs: ドキュメント
style: フォーマット
refactor: リファクタリング
test: テスト
chore: その他
```

### ブランチ
- `main`: 本番
- `feat/*`: 新機能
- `fix/*`: バグ修正

## IaC (Infrastructure as Code)

### Alchemy.run

Cloudflareリソースの管理にはAlchemy.runを使用する。

**参考情報**:
- 公式ドキュメント: https://alchemy.run/
- GitHub: https://github.com/alchemy-run/alchemy

### 管理対象リソース
- Cloudflare Workers
- Cloudflare R2（ストレージ）
- Cloudflare HyperDrive（DB接続）
- カスタムドメイン

### コマンド
```bash
bun run dev         # ローカル開発（Alchemy経由）
bun run deploy      # 本番デプロイ
bun run destroy     # リソース削除
```

### 注意
- Cloudflareの操作はAlchemy.run経由で行う（直接APIを叩かない）
- インフラ変更は`alchemy.run`設定ファイルを編集してデプロイ
