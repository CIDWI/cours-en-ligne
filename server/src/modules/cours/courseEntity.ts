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
import {Chapter} from "../chapter/chapterEntity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  title: string;
  @OneToMany(() => Chapter, (chapter) => chapter.course)
  chapters: Chapter[];
}