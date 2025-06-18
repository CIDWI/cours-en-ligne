import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {Chapter} from "../chapter/chapterEntity";
import {Advancement} from "../advancement/advancementEntity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        unique: true,
    })
    login: string;
    @Column()
    password: string;
    @Column({
        nullable: false,
    })
    role?: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @OneToMany(() => Advancement, (advancement) => advancement.user)
    advancements: Advancement[];
}
