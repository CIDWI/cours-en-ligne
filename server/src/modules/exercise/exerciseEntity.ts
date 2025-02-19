import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { Lesson } from "../lesson/lessonEntity";


@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  title: string;
  @Column()
  imageLink: string; 
  @Column("longtext")
  content: string;
  
  @ManyToOne(() => Lesson, (lesson) => lesson.exercises)
  lesson: Lesson;

}
