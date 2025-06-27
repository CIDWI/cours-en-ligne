import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,} from "typeorm";
import {Chapter} from "../chapter/chapterEntity";
import {Exercise} from "../exercise/exerciseEntity";
import {Advancement} from "../advancement/advancementEntity";

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
    @OneToMany(() => Advancement, (advancement) => advancement.lesson)
    advancements: Advancement[];

    @OneToOne(() => Exercise, exercise => exercise.lesson)
    exercise: Exercise;
}
