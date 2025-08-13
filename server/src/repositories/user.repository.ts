import { AppDataSource } from "../config/database";
import { User } from "../entities/user.entity";

export const getUserRepository = () => {
  return AppDataSource.getRepository(User);
};