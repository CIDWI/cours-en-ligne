import { AppDataSource } from "../../dataSource";
import { Advancement } from "./advancementEntity";

export const advancementRepository = AppDataSource.getRepository(Advancement);