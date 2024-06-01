import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number; // 기본키(pk)이며 자동 증가

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column()
    username: string;

    @Column({ default: true }) // 기본값
    createdDt: Date = new Date();

    @Column({ nullable: true })
    providerId: string;
}