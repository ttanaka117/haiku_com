import { Container } from "inversify";
import { TYPES } from "./datasources/repository/types";
import { HaikuRepository } from "./datasources/repository/haiku_repository";
import { DataSource } from "typeorm";
import { Users } from "./model/Users";
import { Prefectures } from "./model/Prefectures";
import { Poets } from "./model/Poet";
import { Kigo } from "./model/Kigo";
import { Haiku } from "./model/Haiku";
import { dataSource } from "./datasource";
import { SearchRepository } from "./datasources/repository/search_repository";
import { Client } from "@elastic/elasticsearch";

var container = new Container();
container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
container.bind<Client>(TYPES.Client).toConstantValue(new Client({
    nodes: [process.env.ELASTIC_SEARCH_URL],
  }));
container.bind<HaikuRepository>(TYPES.HaikuRepository).to(HaikuRepository);
container.bind<SearchRepository>(TYPES.SearchRepository).to(SearchRepository);
export default container;
