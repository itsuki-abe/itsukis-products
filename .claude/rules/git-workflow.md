# Git Workflow Rules

## コミットメッセージ

Conventional Commits形式:

```
<type>: <description>

[optional body]
```

### タイプ

- `feat`: 新機能
- `fix`: バグ修正
- `refactor`: リファクタリング
- `docs`: ドキュメント
- `test`: テスト
- `chore`: その他
- `perf`: パフォーマンス
- `ci`: CI/CD

### 例

```
feat: ユーザー認証機能を追加

- ログイン/サインアップフォーム
- Better Auth連携
- セッション管理
```

## PRプロセス

1. **全コミット履歴を確認**
```bash
git diff main...HEAD
```

2. **PRサマリーを作成**
   - 変更の概要
   - テスト計画
   - 影響範囲

3. **レビューを依頼**

## 機能開発フロー

1. **計画**
   - `/plan`コマンドで計画作成
   - 依存関係とリスクを特定

2. **TDD実装**
   - `/tdd`コマンドで開発
   - 80%以上のカバレッジ

3. **コードレビュー**
   - `/code-review`コマンド
   - Critical/High問題を解消

4. **コミット・プッシュ・PR作成**
   - 許可を求めずに自動実行
   - 下記「自動Git操作」を参照

## 自動Git操作

以下のGit操作は**許可を求めずに実行**する：

### コミット
```bash
git add <files>
git commit -m "<conventional commit message>"
```

### プッシュ
```bash
git push
# 新規ブランチの場合
git push -u origin <branch-name>
```

### PR作成
```bash
gh pr create --title "<title>" --body "<body>"
```

### 実行条件
- コミットメッセージはConventional Commits形式
- PRのbodyにはSummaryとTest planを含める
- mainへの直接push、force pushは禁止

## ブランチ戦略

- `main`: 本番環境
- `feat/*`: 新機能開発
- `fix/*`: バグ修正

## 新ブランチのプッシュ

```bash
git push -u origin <branch-name>
```

## 禁止事項

- `git push --force`（mainへ）
- `git reset --hard`（共有ブランチで）
- コミットメッセージなしのコミット
