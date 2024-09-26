# 環境構築

```zsh
npm install
```

# ローカル起動

```zsh
docker-compose up
```

# Graphql

```
http://localhost:3000/graphql
```

スキーマ定義

```
server/src/graphql/schema.graphql
```

# 設計方針

![image](https://github.com/user-attachments/assets/ad5c0077-bd16-4a52-bd38-08e6794785e8)

# repository

外部のmidlewareに依存する層です。
例では、elastic searchを用いてインデックスの操作を行うためのrepositoryです。

interfaceは定義していません。（依存性逆転の法則は利用していません。）
・理由としては、ミドルウェアに依存するコストと運用コストの天秤をかけた際に運用コストが大きくなると考えたから
・ユニットテストでは、パッチなどで十分にモック可能だと考えたから

```typescript
import { Client } from "@elastic/elasticsearch";

export class SearchRepository {
  private client: Client;

  constructor({ client }: { client: Client }) {
    this.client = client;
  }

  async search({ index, input }: { index: string; input: object }) {
    return await this.client.search({
      index: index,
      body: {
        query: {
          ...input,
        },
      },
    });
  }
}
```

# controller

ロジック部分に該当する層です。
repositoryを引数として受け取り、トランザクションスクリプトとしてロジックを実装します。

```typescript
export const searchHaikus = async ({
  searchRespository,
  haikuRepository,
  input,
}: {
  searchRespository: SearchRepository;
  haikuRepository: HaikuRepository;
  input: SearchHaikusInput;
}) => {
  const { body } = await searchRespository.search({
    index: "haikus",
    input: {
      match: {
        text: input.text,
      },
    },
  });

  const haikus = await haikuRepository.fetchHaikusByIds({
    ids: body.hits.hits.map((h: Hit) => {
      return Number(h._source.id);
    }),
  });

  return haikus;
};
```
