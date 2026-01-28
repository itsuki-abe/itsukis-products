# コントリビューションガイド

## 開発環境セットアップ

### 必要なツール

- [Bun](https://bun.sh/) v1.3.3+
- [Docker](https://www.docker.com/) (CockroachDB用)

### セットアップ手順

1. リポジトリをクローン

```bash
git clone https://github.com/itsuki-abe/itsukis-products.git
cd itsukis-products
```

2. 依存関係をインストール

```bash
bun install
```

3. ローカルDBを起動

```bash
docker compose up -d
```

4. 環境変数を設定

**apps/pagedeck/server/.env**

```env
PAGEDECK_DATABASE_URL="postgresql://root:root@localhost:26257/defaultdb"
PAGEDECK_BETTER_AUTH_SECRET=<ランダム文字列>
PAGEDECK_BETTER_AUTH_URL=http://localhost:3000
PAGEDECK_POLAR_ACCESS_TOKEN=
PAGEDECK_POLAR_SUCCESS_URL=http://localhost:3001/success?checkout_id={CHECKOUT_ID}
PAGEDECK_CORS_ORIGIN=http://localhost:3001
```

**apps/pagedeck/web/.env**

```env
PAGEDECK_VITE_SERVER_URL=http://localhost:3000
```

**packages/common/infra/.env**

```env
NODE_ENV="development"
ALCHEMY_PASSWORD=<ランダム文字列>
ALCHEMY_STATE_TOKEN=<ランダム文字列>
ALCHEMY_STATE_STORE=cloudflare
```

5. DBスキーマを適用

```bash
bun run db:push
```

6. 開発サーバーを起動

```bash
bun run dev:server  # APIサーバー (ポート3000)
bun run dev:web     # フロントエンド (ポート3001)
```

---

## 利用可能なコマンド

| コマンド              | 説明                       |
| --------------------- | -------------------------- |
| `bun run dev`         | 全サービス起動             |
| `bun run dev:web`     | フロントエンド開発サーバー |
| `bun run dev:server`  | APIサーバー開発            |
| `bun run build`       | 全パッケージビルド         |
| `bun run check-types` | TypeScript型チェック       |
| `bun run check`       | Linter & Formatter実行     |
| `bun run db:push`     | DBスキーマ反映             |
| `bun run db:studio`   | Drizzle Studio起動         |
| `bun run db:generate` | マイグレーション生成       |
| `bun run db:migrate`  | マイグレーション実行       |
| `bun run deploy`      | 本番デプロイ               |
| `bun run destroy`     | インフラ削除               |

---

## コーディング規約

### ファイル構成

- **200-400行が標準**、800行が上限
- 高凝集・低結合を維持
- 機能/ドメイン単位で整理

### コードスタイル

- **イミュータビリティ必須**: オブジェクトを直接変更しない
- `console.log`は本番コードに残さない
- `any`型の使用を避ける
- Biome (oxlint/oxfmt) でフォーマット

### ID生成

- `uuidv7()`を使用（時系列ソート可能）

### バリデーション

- Valibotを使用
- ユーザー入力は必ずバリデーション

---

## ブランチ戦略

| ブランチ | 用途       |
| -------- | ---------- |
| `main`   | 本番環境   |
| `feat/*` | 新機能開発 |
| `fix/*`  | バグ修正   |

---

## PRプロセス

1. featureブランチを作成

```bash
git checkout -b feat/your-feature
```

2. 変更をコミット（Conventional Commits形式）

```bash
git commit -m "feat: add new feature"
```

3. PRを作成

```bash
gh pr create --title "feat: add new feature" --body "## Summary\n- ..."
```

### コミットメッセージ形式

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

### PRルール

- mainへの直接プッシュ禁止
- コードレビュー必須
- CI通過必須

---

## ディレクトリ構造

```
apps/
  pagedeck/
    web/                # フロントエンド（TanStack Start）
    server/             # APIサーバー（Hono + oRPC）

packages/
  common/
    config/             # 共通設定
    infra/              # Alchemy.run IaC
  pagedeck/
    api/                # oRPCルーター・プロシージャ
    auth/               # Better Auth設定
    db/                 # Drizzle ORMスキーマ
    env/                # 環境変数定義
```
