import { AppDataSource } from "../../dataSource";
import { Chapter } from "./chapterEntity";

export const ChapterRepository = AppDataSource.getRepository(Chapter);
