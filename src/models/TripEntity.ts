import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./CompanyEntity";

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  from: string;

  @Column({ length: 30 })
  to: string;

  @Column()
  totalSeats: number;

  @Column()
  seatsLeft: number;

  @Column()
  date: Date;

  @ManyToOne(() => Company, (company) => company.trips)
  company: Company;
}
