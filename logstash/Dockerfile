FROM docker.elastic.co/logstash/logstash:8.12.0

RUN rm -rf /usr/share/logstash/pipeline
COPY template.json /usr/share/logstash
COPY pipeline /usr/share/logstash/pipeline
COPY mysql-connector-java-8.0.17.jar /usr/share/logstash/mysql-connector-java-8.0.17.jar
