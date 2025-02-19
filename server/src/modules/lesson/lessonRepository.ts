import { AppDataSource } from "../../dataSource";
import { Lesson } from "./lessonEntity";

export const lessonRepository = AppDataSource.getRepository(Lesson);
