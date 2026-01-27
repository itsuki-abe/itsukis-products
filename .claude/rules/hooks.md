# Hooks Rules

## Hookタイプ

### PreToolUse
ツール実行前の処理:
- 確認プロンプト
- 入力検証
- 条件チェック

### PostToolUse
ツール実行後の処理:
- 自動フォーマット
- 型チェック
- 警告表示

### Stop
セッション終了時の処理:
- 状態保存
- クリーンアップ

## 設定例

### 開発サーバーはtmuxで実行

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(bun run dev*)",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Consider running in tmux for long-running processes'"
          }
        ]
      }
    ]
  }
}
```

### 自動フォーマット

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bunx biome check --write $CLAUDE_FILE_PATHS"
          }
        ]
      }
    ]
  }
}
```

### console.log警告

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "grep -n 'console.log' $CLAUDE_FILE_PATHS && echo 'Warning: console.log found'"
          }
        ]
      }
    ]
  }
}
```

## ベストプラクティス

- 軽量なフックを使用
- 失敗しても続行できるようにする
- ユーザーへのフィードバックを提供
- 長時間実行コマンドを避ける

## 注意

- フックはすべてのツール呼び出しに影響
- パフォーマンスに注意
- エラーハンドリングを実装
