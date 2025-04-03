import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { Chapter } from "../chapter/chapterEntity";
import { Exercise } from "../exercise/exerciseEntity";

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  title: string;
  @Column()
  link: string;
  @Column()
  level: string;
  @Column({
    nullable: false,
  })
  languages: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.lessons)
  chapter: Chapter;

  @OneToOne(() => Exercise, (exercise) => exercise.lesson)
  exercise: Exercise;
}
