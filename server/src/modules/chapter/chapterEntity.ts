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
}