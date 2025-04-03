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
import { User } from "../user/userEntity";

@Entity()
export class Advancement {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  isDone: boolean;
  @OneToOne(() => Lesson)
  @JoinColumn()
  lesson: Lesson;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}