# CLAUDE.md

このファイルはClaude Codeがリポジトリを操作する際のガイダンスを提供します。

## リポジトリ概要

**itsukis-products** - 複数プロダクトを管理するモノレポ

---

## プロダクト一覧

### PageDeck (Zepha)

**ウィジェットベースのマイクロサイト専用ノーコードサービス**

#### コンセプト
- 「Notion site+α くらいの表現力」×「Link in Bio 並みの手軽さ」
- *"プロフィールや採用・イベントのマイクロサイトを、誰でも 5 分で。"*

#### ターゲット
- SaaS / スタートアップの採用・マーケ担当
- クリエイター（Link in Bio として利用）

#### ユースケース
- 採用募集ページ（求人LP・ポジション紹介）
- イベントページ（勉強会、ウェビナー、カンファレンス）
- 商品紹介ページ / LP
- シンプルな情報サイト / コーポレートサイト

#### 主要機能
- セクション / ブロックベースのページ編集（ウィジェット配置）
- テーマ / デザイン設定（カラー、フォント、角丸など）
- テンプレート（採用、イベント、LP等）
- 簡易CMS機能
- フォーム機能（問い合わせ / 応募）
- 組織向け機能（ワークスペース、権限、ブランドガイドライン、承認フロー）

#### 非ゴール
- 高度なアニメーション / ピクセル単位のレイアウト
- 大規模・複雑なサイト（数百ページ規模）
- 本格ECサイト / Webアプリケーション

#### 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フロントエンド | React 19, TanStack Start, TailwindCSS v4, Shadcn/UI |
| バックエンド | Hono, oRPC, Drizzle ORM v1 beta, CockroachDB |
| 認証 | Better Auth (Organization, MagicLink, Polar) |
| インフラ | Cloudflare Workers, HyperDrive, R2 |

#### ディレクトリ
- `apps/zepha/web` - フロントエンド
- `apps/zepha/server` - APIサーバー
- `packages/zepha/*` - 共有パッケージ

---

## 共通技術スタック

| カテゴリ | 技術 |
|---------|------|
| パッケージ管理 | Bun Workspace |
| ビルド | Turborepo |
| Linter/Formatter | Biome |
| IaC | Alchemy.run |
| デプロイ先 | Cloudflare Workers |

---

## Critical Rules

### 1. コード構成

- **多数の小さなファイル > 少数の大きなファイル**
- ファイルサイズ: 200-400行が標準、800行が上限
- 高凝集・低結合を維持
- 機能/ドメイン単位で整理

### 2. コードスタイル

- **イミュータビリティ必須**: オブジェクトを直接変更しない
- `console.log`は本番コードに残さない
- 適切なエラーハンドリングを実装
- `any`型の使用を避ける

### 3. テスト

- **最小カバレッジ: 80%**
- ユニットテスト: 個別関数・コンポーネント
- 統合テスト: API・DB操作
- E2Eテスト: Playwrightで重要フロー

### 4. セキュリティ

- シークレットは環境変数で管理（ハードコード禁止）
- ユーザー入力は必ずValibotでバリデーション
- 認証が必要なエンドポイントには`protectedProcedure`を使用
- SQLインジェクション・XSS対策を常に意識

---

## ディレクトリ構造

```
apps/
  zepha/                # Zepha プロダクト
    web/                # フロントエンド（TanStack Start）
    server/             # APIサーバー（Hono + oRPC）
  [future-product]/     # 将来のプロダクト

packages/
  common/               # 全プロダクト共通
    config/             # 共通設定
  zepha/                # Zepha専用パッケージ
    api/                # oRPCルーター・プロシージャ
    auth/               # Better Auth設定
    db/                 # Drizzle ORMスキーマ
    ui/                 # Shadcn/UIコンポーネント
  [future-product]/     # 将来のプロダクト専用パッケージ
```

---

## キーパターン

### APIレスポンス形式

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: { timestamp: string }
}
```

### oRPCプロシージャ

```typescript
// 認証不要
export const publicProcedure = o

// 認証必須
export const protectedProcedure = o.use(requireAuth)

// 使用例
export const todoRouter = o.router({
  list: protectedProcedure
    .handler(async ({ context }) => {
      return db.select().from(todos)
        .where(eq(todos.userId, context.session.user.id))
    }),

  create: protectedProcedure
    .input(v.object({ title: v.string() }))
    .handler(async ({ input, context }) => {
      return db.insert(todos).values({
        id: uuidv7(),
        title: input.title,
        userId: context.session.user.id,
      })
    }),
})
```

### エラーハンドリング

```typescript
try {
  const result = await riskyOperation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  throw new ORPCError('INTERNAL_SERVER_ERROR', {
    message: '操作に失敗しました',
  })
}
```

### 入力バリデーション（Valibot）

```typescript
import * as v from 'valibot'

const createUserSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  name: v.pipe(v.string(), v.minLength(1), v.maxLength(100)),
})
```

---

## 開発コマンド

```bash
# 開発サーバー
bun run dev:web          # フロントエンド開発
bun run dev:server       # APIサーバー開発

# データベース
bun run db:push          # スキーマをDBに反映
bun run db:studio        # Drizzle Studio起動
bun run db:generate      # マイグレーション生成
bun run db:migrate       # マイグレーション実行

# ビルド・デプロイ
bun run build            # 全パッケージビルド
bun run deploy           # Alchemyでデプロイ
bun run check-types      # 型チェック
bun run check            # Biomeでフォーマット・Lint
```

---

## Git規約

### コミットメッセージ（Conventional Commits）

```
feat: 新機能
fix: バグ修正
docs: ドキュメント
style: フォーマット
refactor: リファクタリング
test: テスト
chore: その他
perf: パフォーマンス
```

### ブランチ戦略

- `main`: 本番環境
- `feat/*`: 新機能開発
- `fix/*`: バグ修正

### PRルール

- mainへの直接プッシュ禁止
- コードレビュー必須
- CI通過必須

---

## 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `/plan` | 実装計画を作成 |
| `/tdd` | テスト駆動開発を実行 |
| `/build-fix` | ビルドエラーを修正 |
| `/code-review` | コードレビューを実行 |
| `/e2e` | E2Eテストを実行 |
| `/refactor-clean` | デッドコードを削除 |
| `/test-coverage` | カバレッジを分析 |
| `/update-docs` | ドキュメントを更新 |
| `/commit` | コミット・プッシュ・PR作成/更新 |

---

## 重要な注意事項

### 共通
- **ID生成**: `uuidv7()`を使用（時系列ソート可能）
- **Cloudflare Workers環境**: `cloudflare:workers`から`env`をインポートして環境変数にアクセス
- **スタイリング**: `cn()`ユーティリティでTailwindクラスを結合

### Zepha固有
- **oRPCのContext**: `createContext`でセッション情報を取得。`protectedProcedure`で認証必須化
- **Better Auth**: `@itsukis-products/zepha-auth`からエクスポート。Organization・MagicLink・Polar連携あり
- **TanStack Start**: ルーティングは`apps/zepha/web/src/routes/`に配置。ファイルベースルーティング

---

## IaC (Infrastructure as Code)

### Alchemy.run

Cloudflareリソースの管理には**Alchemy.run**を使用する。

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

### 重要
- **Cloudflareの操作はAlchemy.run経由で行う**（直接APIを叩かない）
- インフラ変更は設定ファイルを編集してデプロイ
