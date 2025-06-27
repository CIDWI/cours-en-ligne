import { AppDataSource } from "../../dataSource";
import { Chapter } from "./chapterEntity";

export const chapterRepository = AppDataSource.getRepository(Chapter);
