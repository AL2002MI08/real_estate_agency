import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";
import { User } from "../entities/user.entity"

@Entity("residencies")
@Unique(["address", "userEmail"])
export class Residency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  image?: string;

  @Column("jsonb")
  facilities: { [key: string]: boolean | string | number };

  @Column()
  userEmail: string;

  @ManyToOne(() => User, (user) => user.ownedResidencies)
  @JoinColumn({ name: "userEmail", referencedColumnName: "email" })
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
