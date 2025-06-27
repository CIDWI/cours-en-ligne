import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,} from "typeorm";
import {Lesson} from "../lesson/lessonEntity";


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

    @OneToOne(() => Lesson, (lesson) => lesson.exercise,{nullable: true, onDelete: 'SET NULL'})
    @JoinColumn()
    lesson: Lesson;

}
