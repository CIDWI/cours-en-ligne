import { AppDataSource } from "../../dataSource";
import { Advancement } from "./advancementEntity";

export const AdvancementRepository = AppDataSource.getRepository(Advancement);