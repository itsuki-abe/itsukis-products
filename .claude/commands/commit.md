# /commit

コミット・プッシュ・PR作成/更新を一括で実行するコマンド。

## 実行手順

1. **変更確認**
```bash
git status
git diff --name-only HEAD
```

2. **ステージング**
```bash
git add <changed-files>
```

3. **コミット**
```bash
git commit -m "<conventional commit message>"
```

コミットメッセージ形式:
```
<type>: <description>

[optional body]
```

4. **プッシュ**
```bash
git push
# 新規ブランチの場合
git push -u origin <branch-name>
```

5. **PR作成/更新**

### 新規PRの場合
```bash
gh pr create --title "<title>" --body "<body>"
```

### 既存PRの場合
```bash
gh pr edit <pr-number> --body "<updated-body>"
```

## PRテンプレート

```markdown
## Summary
- [変更内容を箇条書き]

## Test plan
- [ ] [テスト項目]
```

## 注意事項

- **許可不要**: このフローは許可を求めずに実行する
- **Conventional Commits**: コミットメッセージは必ず形式に従う
- **禁止事項**: mainへの直接push、force pushは禁止
