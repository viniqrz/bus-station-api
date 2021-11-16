import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trip } from "./TripEntity";
import { User } from "./UserEntity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Trip, (trip) => trip.company)
  trips: Trip[];

  @OneToMany(() => User, (user) => user.company)
  employees: User[];
}
