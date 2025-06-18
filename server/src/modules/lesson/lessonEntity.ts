import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Chapter } from "../chapter/chapterEntity"
import { Exercise } from "../exercise/exerciseEntity"

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  title: string

  @Column()
  link: string

  @Column()
  level: string

  @Column()
  languages: string

  @ManyToOne(() => Chapter, (chapter) => chapter.lessons)
  chapter: Chapter

  @OneToOne(() => Exercise, (exercise) => exercise.lesson)
    // Rajouter @JoinColumn
  exercise: Exercise
}
