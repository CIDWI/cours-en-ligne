import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

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
}
