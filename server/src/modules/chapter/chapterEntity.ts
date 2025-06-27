import {
  ArrayElement,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { Lesson } from "../lesson/lessonEntity";
import {Course} from "../cours/courseEntity";

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  title: string;
  @OneToMany(() => Lesson, (lesson) => lesson.chapter)
  lessons: Lesson[];
  @ManyToOne(() => Course, (course) => course.chapters)
  course: Course;
}