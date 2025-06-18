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
import {Course} from "../cours/courseEntity";

@Entity()
export class Advancement {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  isDone: boolean;
  @OneToOne(() => Lesson)
  @JoinColumn()
  lesson: Lesson;
  @ManyToOne(() => User, (user) => user.advancements)
  @JoinColumn()
  user: User;
}