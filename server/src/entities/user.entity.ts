import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Residency } from "../entities/residency.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  image?: string;

  @Column("json", { default: [] })
  bookedVisits?: { id: number; date: string }[];

  @Column("int", { array: true, default: [] })
  favResidenciesID?: number[];

  @OneToMany(() => Residency, (residency) => residency.owner)
  ownedResidencies?: Residency[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
