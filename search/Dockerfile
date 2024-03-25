FROM docker.elastic.co/elasticsearch/elasticsearch:7.17.17

COPY config /usr/share/elasticsearch/config
COPY security /usr/share/elasticsearch/security

RUN elasticsearch-plugin install analysis-kuromoji
