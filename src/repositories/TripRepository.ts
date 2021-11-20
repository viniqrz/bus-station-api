import { TripQueryDTO } from "../@types/dto/TripDto";
import { Trip } from "../models/TripEntity";
import { Between, EntityRepository, Repository } from "typeorm";

export interface ITripRepository {
  save(trip: Trip): Promise<Trip>;
  findAll(queryObj: TripQueryDTO): Promise<Trip[]>;
  findById(id: number): Promise<Trip>;
  remove(trip: Trip): Promise<Trip>;
}

@EntityRepository(Trip)
export class TripRepository
  extends Repository<Trip>
  implements ITripRepository
{
  public async findAll(queryObj: TripQueryDTO): Promise<Trip[]> {
    const query = {};

    if ("dateStart" in queryObj && "dateEnd" in queryObj) {
      query["date"] = Between(queryObj.dateStart, queryObj.dateEnd);
    }

    if ("from" in queryObj) query["from"] = queryObj.from;
    if ("to" in queryObj) query["to"] = queryObj.to;

    console.log(query);

    return await this.find({ where: query });
  }

  public async findById(id: number): Promise<Trip> {
    return await this.findOne({
      where: { id },
      relations: ["users", "company"],
    });
  }
}
