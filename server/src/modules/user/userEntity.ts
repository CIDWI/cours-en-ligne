import {Column, Entity, PrimaryGeneratedColumn,} from "typeorm";

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
}