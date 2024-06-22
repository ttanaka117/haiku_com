# 環境構築

```zsh
npm install
```

# 起動

```zsh
npm run start
```

## Graphql

server の Grahpql スキーマと query.grpahql から型や Hooks を自動生成します

```zsh
npm run codegen
```

Document を import して利用します。

```typescript
const haikusResponse = await apolloClient.query({
  query: HaikusDocument,
  variables: {
    limit: 50,
    after: page * 50,
  },
});
```

# 設計方針

`Redux` をベースにします。

参考:
![20230609185728](https://github.com/tomoyukitanaka1171/haiku_com/assets/88293843/ab0037c0-e361-4566-963a-39b4432955df)

## Behavior

`Behavior` クラスにまとめてください。
`Behavior` は [ApolloClient](https://www.apollographql.com/docs/react/api/core/ApolloClient/) と [AppDispatch](https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-dispatch-and-getstate) を受け取ります。

```typescript
export class haikuBehavior {
  private client: ApolloClient<NormalizedCacheObject>;
  private dispatch: AppDispatch;

  ...
}
```

ロジックごとにインスタンスメソッドを追加します。
`ApolloClient` からデータをフェッチし、`dispatch` から `store`の状態を変更します。
非同期処理の場合は必要に応じて`isLoading`を更新します。

命名は恣意的なものにならないよう、簡潔にすることを推奨します。

```typescript

async initializeHaikus() {
  this.dispatch(isLoading(true));
  const response = await this.client.query({
    query: HaikusDocument,
    variables: {
      limit: 50,
      after: 1 * 50,
    },
  });
  this.dispatch(
    swapHaikus({
      haikus: _toModel(response),
    })
  );
  this.dispatch(isLoading(false));
}

```

`store` に渡す値はアプリケーションの基盤となる `Model` に変換してから渡してください。
`Model` については後述します。

```typescript
const _toModel = (response: ApolloQueryResult<HaikusEdges>): Haiku[] => {
  return response.data.haikus.edges.map((edge) => {
    return {
      id: edge.node.id,
      text: edge.node.text,
      textKana: edge.node.textKana,
      likesCount: edge.node.likesCount,
      author: edge.node.author,
      kigo: edge.node.kigo,
    };
  });
};
```

## Model

`Model` はアプリケーションの基盤となります。
必ずしも`Graphql`の`Types`と一致する必要はありません。

```typescript

export type Haikus = {
  haikus: Haiku[];
};

export type Haiku = {
  id: string;
  text: string;
  textKana: string;
  author: Poet;
  kigo: Kigo[];
  likesCount: number;
};

```

プリミティブな型（`number` や `string`）で `ID` を扱うと意図しない比較が行われる可能性があるため、`HaikuId型`を定義してください。 

```typescript

export type HaikuId = Id<"Haiku"> & number;
export function toHaikuId(haikuId: number): HaikuId {
  return haikuId as HaikuId;
}

```

### slice

[reduxToolkitのslice](https://redux-toolkit.js.org/api/createSlice)です。

基本は前述した`Model`単位で作ることが多いです。

```typescript
export const topPageSlice = createSlice({
  name: "haikuState",
  initialState: haikuState,
  reducers: {
    swapHaikus: (state, action: PayloadAction<Haikus>) => {
      if (action.payload.haikus === undefined) return;
      state.value.haikus = action.payload.haikus;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
```

> [!Warning]
> 下記はアンチパターンです。
> 画面の粒度でsliceを作ってしまうと、他の画面に遷移した場合に参照できなくなります。

```typescript
export const topPageSlice = createAppSlice({
  name: "topPage",
  initialState: initialState,
  reducers: {
    swapHaikus: (state, action: PayloadAction<Haikus>) => {
      if (action.payload.haikus === undefined) return;
      state.value.haikus = action.payload.haikus;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
```

### ユニットテスト

> [!Warning]
> まだ実装できてないです

### staging ビルド

```
npm run build-stg
```
