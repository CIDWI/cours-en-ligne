import { AppDataSource } from "../../dataSource";
import { Course } from "./courseEntity";

export const courseRepository = AppDataSource.getRepository(Course);
