# Performance Rules

## モデル選択

- **Haiku**: 軽量タスク、コード生成（コスト効率重視）
- **Sonnet**: メイン開発、マルチエージェント
- **Opus**: アーキテクチャ決定、深い推論

## コンテキストウィンドウ戦略

コンテキストの最後の1/5は避ける:
- 大規模リファクタリング
- 複雑なマルチファイルデバッグ

代わりに:
- 単一ファイル編集
- ドキュメント作業

## 高度なテクニック

複雑なタスク:
1. Plan Modeで計画
2. 拡張思考を有効化
3. 複数レビューサイクル
4. 専門サブエージェントを使用

## ビルド問題

コンパイル失敗時:
1. build-error-resolverエージェントを使用
2. エラーを系統的に分析
3. 段階的に修正
4. 各変更を検証

## フロントエンドパフォーマンス

### メモ化

```typescript
// 高コストな計算
const result = useMemo(() => expensiveCalculation(data), [data])

// コールバック
const handler = useCallback(() => doSomething(), [])

// コンポーネント
const MemoizedComponent = memo(Component)
```

### Code Splitting

```typescript
const HeavyComponent = lazy(() => import('./Heavy'))

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### リストの仮想化

大量アイテム表示時は仮想化ライブラリを使用。

## バックエンドパフォーマンス

### N+1問題回避

```typescript
// NG: N+1
for (const user of users) {
  const posts = await db.select().from(posts).where(eq(posts.userId, user.id))
}

// OK: バッチ取得
const userIds = users.map(u => u.id)
const allPosts = await db.select().from(posts).where(inArray(posts.userId, userIds))
```

### キャッシング

HyperDriveの接続プーリングを活用。

## 並列実行

```typescript
// NG: 直列
const a = await fetchA()
const b = await fetchB()

// OK: 並列
const [a, b] = await Promise.all([fetchA(), fetchB()])
```
