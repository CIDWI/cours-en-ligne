import { AppDataSource } from "../../dataSource";
import { Exercise } from "./exerciseEntity";

export const exerciseRepository = AppDataSource.getRepository(Exercise);
