import { DataSource, In, MoreThan, Repository } from "typeorm";
import { Haiku } from "../../model/Haiku";
import { injectable, inject } from "inversify";
import { TYPES } from "./types";

@injectable()
export class HaikuRepository {
  datasorce: DataSource;

  private repository: Repository<Haiku>;

  constructor(@inject(TYPES.DataSource) datasorce: DataSource) {
    this.repository = datasorce.getRepository(Haiku);
  }

  async fetchHaikus() {
    console.log("fetchHaikus");
    const result = await this.repository.find({
      relations: {
        author: true,
        kigo: true,
      },
    });
    console.log(result);
    return result;
  }

  async fetchAllHaikusCount() {
    return await this.repository.count();
  }

  async fetchHaikusByIds({ ids }: { ids: number[] }) {
    return await this.repository.find({
      where: {
        id: In(ids),
      },
      relations: {
        author: true,
        kigo: true,
      },
    });
  }

  async fetchHaikusWithPaging({
    limit,
    after,
  }: {
    limit: number;
    after: number;
  }) {
    console.log("fetchHaikus");

    const result = await this.repository.find({
      take: limit,
      where: {
        id: MoreThan(after),
      },
      relations: {
        author: true,
        kigo: true,
      },
    });
    console.log(result);
    return result;
  }
}
