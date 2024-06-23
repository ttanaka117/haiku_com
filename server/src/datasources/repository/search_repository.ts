import { Client } from "@elastic/elasticsearch";
import { toInputHaikus } from "../../scripts/insert_index";
import { Haiku } from "../../model/Haiku";

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

  async add_haiku(input: Haiku) {
    return await this.client.index({
      index: "haikus",
      body: {
        id: input.id,
        text: input.text,
        text_kana: "",
        season: "",
        author: "",
      },
    });
  }
}
