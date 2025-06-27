import { DataSource, LessThanOrEqual } from 'typeorm'
import { User } from './modules/user/userEntity'
import { Lesson } from './modules/lesson/lessonEntity'
import { Chapter } from './modules/chapter/chapterEntity'
import { Exercise } from './modules/exercise/exerciseEntity'
import { Advancement } from './modules/advancement/advancementEntity'
import {Course} from "./modules/cours/courseEntity";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'app_db',
  entities: [User,Lesson, Chapter, Exercise, Advancement,Course],
  synchronize: true,
  logging: false,
})
