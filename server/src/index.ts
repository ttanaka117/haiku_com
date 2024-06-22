import "reflect-metadata";
import express from "express";
import http from "http";
import dotenv from "dotenv";
// import { typeDefs } from "./graphql/types.js";
import { Client } from "@elastic/elasticsearch";
import { DataSource } from "typeorm";
import { createResolvers } from "./graphql/resolver.js";
import { readFileSync } from "fs";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { HaikuRepository } from "./datasources/repository/haiku_repository.js";
import { UserRepository } from "./datasources/repository/user_repository.js";
import { PoetsRepository } from "./datasources/repository/poets_repository.js";
import { SearchRepository } from "./datasources/repository/search_repository.js";
import { TYPES } from "./datasources/repository/types.js";
import container from "./inversify.config.js";
import { insertHaikus } from "./scripts/insert_haikus.js";
import { insertSanitizedKigos } from "./scripts/insert_kigos.js";
import { trauncateTable } from "./scripts/truncate_table.js";
import { insertIndex } from "./scripts/insert_index.js";
import { Haiku } from "./model/Haiku.js";
import { insertHaijins } from "./scripts/insert_haijins.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const dataSource = container.get<DataSource>(TYPES.DataSource);
await dataSource.initialize();
const resolvers = createResolvers();
// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync("./src/graphql/schema.graphql", {
  encoding: "utf-8",
});
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
});
await server.start();
app.use("/graphql", cors(), express.json(), expressMiddleware(server));
await new Promise<void>((resolve) => {
  return httpServer.listen({ port: 4000 }, resolve);
});
console.log(`🚀  Server ready`);

// TODO: DIコンテナに移動
export const userReposiory = new UserRepository(dataSource);
export const poetReposiory = new PoetsRepository(dataSource);
const searchClient = container.get<Client>(TYPES.Client);
export const searchRepository = new SearchRepository({
  client: searchClient,
});

// TODO: 初期データの投入方法を考える
try {
  console.log("start insert db");
  await trauncateTable(dataSource);
  // await insertSanitizedKigos(dataSource);
  // await insertHaijins(dataSource);
  await insertHaikus(dataSource);
  await insertIndex(dataSource.getRepository(Haiku), searchClient);
} catch (e) {
  console.log("insert error", e);
}
