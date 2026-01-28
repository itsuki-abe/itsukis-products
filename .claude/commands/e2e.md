# /e2e

E2Eテストを実行・作成するコマンド。

## 機能

1. **テスト生成**: Playwrightテストを作成
2. **テスト実行**: 複数ブラウザで実行
3. **アーティファクト管理**: スクリーンショット、動画、トレース
4. **レポート生成**: HTML/JUnitレポート
5. **Flaky検出**: 不安定なテストを特定

## コマンド

```bash
# テスト実行
bunx playwright test

# ヘッドモード
bunx playwright test --headed

# デバッグ
bunx playwright test --debug

# コード生成
bunx playwright codegen http://localhost:3000

# レポート表示
bunx playwright show-report
```

## テスト構造

```
tests/
  e2e/
    auth/
      login.spec.ts
      signup.spec.ts
    dashboard/
      overview.spec.ts
```

## テストパターン

```typescript
import { test, expect } from '@playwright/test'

test.describe('認証フロー', () => {
  test('ログインできる', async ({ page }) => {
    await page.goto('/login')
    await page.getByTestId('email').fill('test@example.com')
    await page.getByTestId('password').fill('password')
    await page.getByTestId('submit').click()

    await expect(page).toHaveURL('/dashboard')
  })
})
```

## ベストプラクティス

- `data-testid`を使用
- 固定待機を避ける
- Page Object Modelを使用
- テストを独立させる

## 重要なフロー

1. **認証**: サインアップ、ログイン、ログアウト
2. **ダッシュボード**: データ表示、CRUD
3. **決済**: チェックアウト（テスト環境のみ）

## 注意

- 本番環境でテストしない
- テスト用データを使用
- 決済はテストモードで実行
