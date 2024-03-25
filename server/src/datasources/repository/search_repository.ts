import { Client } from "@elastic/elasticsearch";

export class SearchRepository {
  private client: Client;

  constructor({ client }: { client: Client }) {
    this.client = client;
  }

  async search({ index, query }: { index: string; query: object }) {
    return await this.client.search({
      index: index,
      body: query,
    });
  }
}
