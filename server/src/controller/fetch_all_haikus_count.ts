import { HaikuRepository } from "../datasources/repository/haiku_repository";

export const fetchAllHaikusCount = async ({
  repository,
}: {
  repository: HaikuRepository;
}) => {
  return await repository.fetchAllHaikusCount();
};
