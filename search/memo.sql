## 状態確認

curl -XGET http://localhost:9200/

## インデックス一覧

curl -XGET 'localhost:9200/_cat/indices?'
curl -XGET 'localhost:9200/haikus/_mapping?pretty' 
curl -XGET 'localhost:9200/haikus/_doc?pretty' 

## インデックス登録

curl -X PUT "localhost:9200/letters?pretty&pretty"
curl -H "Content-Type: application/json" -XPOST http://localhost:9200/letters/_mapping -d "@letters_mapping.json"

curl -XDELETE 'localhost:9200/haikus?pretty'


## データ登録
curl -X POST "localhost:9200/letters/_bulk?pretty&pretty"
{
    ""
}

curl -H "Content-Type: application/json" -X POST "localhost:9200/letters/_delete?pretty" -d'{
  "query": {
    "match": {}
  }
}'

curl -X DELETE "localhost:9200/letters/?pretty"

curl -X GET "localhost:9200/_nodes/plugins?pretty"

curl -H "Content-Type: application/json" -XPOST http://localhost:9200/letters/_doc -d "@letters.json"
{"index": {"\_id": 1}}
{"item_name" : "シャツ"}
{"index": {"\_id": 2}}
{"item_name" : "パンツ"}
{"index": {"\_id": 3}}
{"item_name" : "帽子"}

## 検索

GET /letters/\_search
{
"size":10
}
curl -XGET 'https://haiku-com-search-5ns5e764wq-an.a.run.app/letters/_search?pretty' -H "Content-Type: application/json" -d'{
  "query": {
    "match": {
      "penname": "いい"
    }
  }
}'
curl -XGET 'localhost:9200/letters/_search?pretty' -H "Content-Type: application/json" -d'{
  "query": {
    "wildcard": {
      "penname": "*尾崎*"
    }
  }
}'

curl -XPUT -H "Content-Type: application/json" 'localhost:9200/letters?pretty' -d@template.json

