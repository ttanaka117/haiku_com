import { DataSource } from "typeorm";
import { Users } from "../model/Users";
import { UserRepository } from "../datasources/repository/user_repository";

export const fetchUsers = ({
  userReposiory,
}: {
  userReposiory: UserRepository;
}) => {
  return userReposiory.fetchUsers();
};
