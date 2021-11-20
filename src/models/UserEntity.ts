import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from "typeorm";

import { Company } from "./CompanyEntity";
import { Trip } from "./TripEntity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 30 })
  lastName: string;

  @Column()
  role: "passenger" | "admin" | "employee";

  @ManyToOne(() => Company, (company) => company.employees, { nullable: true })
  company: Company;

  @ManyToMany(() => Trip, (trip) => trip.users, { cascade: true })
  trips: Trip[];
}
