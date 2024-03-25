# ローカル起動

```zsh
docker-compose up --build
```

# 検索 api の参考

## 状態確認

```zsh
curl -XGET http://localhost:9200/
```

##　 一覧

```zsh
curl -XGET "http://localhost:9200/\_cat/indices?"
curl -XGET 'localhost:9200/${index}/\_mapping?pretty'
curl -XGET 'localhost:9200/${index}/\_doc?pretty'
```

## 登録

```zsh

curl -X PUT "localhost:9200/${index}?pretty&pretty"

```

## 削除

```zsh
curl -XDELETE 'localhost:9200/${index}?pretty'
```

## データ登録

```zsh
curl -X POST "localhost:9200/letters/\_bulk?pretty&pretty"
{
""
}
```

## 検索

```zsh
GET /${index}/\_search
{
"size":10
}
```

```zsh
curl -XGET 'localhost:9200/${index}/\_search?pretty' -H "Content-Type: application/json" -d'{
"query": {
        "wildcard": {
            "${field}": ""
}
}
}'
```
