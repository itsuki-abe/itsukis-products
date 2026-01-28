# 運用手順書 (Runbook)

## デプロイ

### 本番デプロイ

1. 型チェック

```bash
bun run check-types
```

2. ビルド

```bash
bun run build
```

3. デプロイ（Alchemy.run経由）

```bash
bun run deploy
```

### ロールバック

Cloudflare Dashboardから以前のデプロイメントにロールバック可能。

---

## インフラ構成

| コンポーネント | サービス                            |
| -------------- | ----------------------------------- |
| フロントエンド | Cloudflare Workers (TanStack Start) |
| APIサーバー    | Cloudflare Workers (Hono)           |
| データベース   | CockroachDB                         |
| ストレージ     | Cloudflare R2                       |
| DB接続         | Cloudflare HyperDrive               |

---

## 環境変数

### apps/pagedeck/server

| 変数名                        | 説明                       | 必須 |
| ----------------------------- | -------------------------- | ---- |
| `PAGEDECK_DATABASE_URL`       | CockroachDB接続文字列      | ✓    |
| `PAGEDECK_BETTER_AUTH_SECRET` | Better Auth秘密鍵          | ✓    |
| `PAGEDECK_BETTER_AUTH_URL`    | Better AuthベースURL       | ✓    |
| `PAGEDECK_CORS_ORIGIN`        | CORS許可オリジン           | ✓    |
| `PAGEDECK_POLAR_ACCESS_TOKEN` | Polarアクセストークン      |      |
| `PAGEDECK_POLAR_SUCCESS_URL`  | Polar成功時リダイレクトURL |      |

### apps/pagedeck/web

| 変数名                     | 説明           | 必須 |
| -------------------------- | -------------- | ---- |
| `PAGEDECK_VITE_SERVER_URL` | APIサーバーURL | ✓    |

### packages/common/infra

| 変数名                | 説明                          | 必須 |
| --------------------- | ----------------------------- | ---- |
| `NODE_ENV`            | 環境 (development/production) | ✓    |
| `ALCHEMY_PASSWORD`    | Alchemy暗号化パスワード       | ✓    |
| `ALCHEMY_STATE_TOKEN` | Alchemy状態トークン           | ✓    |
| `ALCHEMY_STATE_STORE` | 状態ストア種別 (cloudflare)   | ✓    |

---

## データベース

### CockroachDB

**ローカル起動**

```bash
docker compose up -d
```

**接続情報**

- ホスト: `localhost`
- ポート: `26257`
- ユーザー: `root`
- パスワード: `root`
- DB名: `defaultdb`

**Admin UI**

- URL: http://localhost:8080

### スキーマ操作

```bash
# スキーマをDBに反映
bun run db:push

# マイグレーション生成
bun run db:generate

# マイグレーション実行
bun run db:migrate

# Drizzle Studio起動
bun run db:studio
```

---

## トラブルシューティング

### DB接続エラー

**症状**: `connection refused` エラー

**対処**:

1. Docker Composeが起動しているか確認

```bash
docker compose ps
```

2. 再起動

```bash
docker compose down && docker compose up -d
```

3. 接続文字列を確認

```bash
echo $PAGEDECK_DATABASE_URL
```

### 型エラー

**症状**: `bun run check-types` が失敗

**対処**:

1. 依存関係を再インストール

```bash
rm -rf node_modules bun.lock
bun install
```

2. TypeScriptキャッシュをクリア

```bash
rm -rf **/tsconfig.tsbuildinfo
```

### デプロイ失敗

**症状**: `bun run deploy` がエラー

**対処**:

1. 環境変数を確認

```bash
cat packages/common/infra/.env
```

2. Alchemyの状態をリセット

```bash
bun run destroy
bun run deploy
```

3. Cloudflare Dashboardでログを確認

---

## 監視

### ログ確認

Cloudflare Dashboard → Workers → ログ

### メトリクス

Cloudflare Dashboard → Workers → メトリクス

---

## 復旧手順

### データベース復旧

1. CockroachDBのバックアップから復元
2. アプリケーションを再デプロイ

### 完全復旧

1. インフラを破棄

```bash
bun run destroy
```

2. 環境変数を再設定

3. インフラを再構築

```bash
bun run deploy
```

4. DBスキーマを適用

```bash
bun run db:push
```
