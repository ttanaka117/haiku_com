import { DataSource, MoreThan, Repository } from "typeorm";
import { Haiku } from "../../model/Haiku";
import { Poets } from "../../model/Poet";
import { Users } from "../../model/Users";

export class UserRepository {
  datasorce: DataSource;

  private repository: Repository<Users>;

  constructor(datasorce: DataSource) {
    this.repository = datasorce.getRepository(Users);
  }

  async fetchUsers() {
    return await this.repository.find();
  }
}
