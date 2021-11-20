import { TripDTO, TripQueryDTO, UpdateTripDTO } from "../@types/dto/TripDto";
import { Trip } from "../models/TripEntity";
import { ITripRepository } from "../repositories/TripRepository";
import Container, { Inject, Service } from "typedi";
import { UserService } from "./UserService";
import { Company } from "../models/CompanyEntity";
import { User } from "../models/UserEntity";

export interface ITripService {
  create(tripDto: TripDTO): Promise<Trip>;
  bookSeat(tripId: number, userId: number, companyId?: number): Promise<Trip>;
  getAll(queryObj: TripQueryDTO): Promise<Trip[]>;
  getById(id: number): Promise<Trip>;
  update(id: number, fields: UpdateTripDTO): Promise<Trip>;
  delete(id: number): Promise<Trip>;
}

@Service("TripService")
export class TripService implements ITripService {
  constructor(
    @Inject("TripRepository") private tripRepository: ITripRepository
  ) {}

  public async create(tripDto: TripDTO): Promise<Trip> {
    const trip = await this.tripFactory(tripDto);

    return await this.tripRepository.save(trip);
  }

  public async bookSeat(
    tripId: number,
    passengerId: number,
    companyId?: number
  ): Promise<Trip> {
    try {
      const userService = Container.get<UserService>("UserService");

      const trip = await this.getById(tripId);

      if (trip.seatsLeft === 0) throw new Error("No seats left");

      console.log(trip);

      if (companyId && companyId !== trip.company.id)
        throw new Error("No access to company tickets");

      const user = await userService.getById(passengerId);

      trip.seatsLeft -= 1;
      trip.users = [...trip.users, user as User];

      const savedTrip = await this.tripRepository.save(trip);

      return savedTrip;
    } catch (err) {
      throw new Error(`Couldn't book seat: ${err.message}.`);
    }
  }

  public async getAll(queryObj: TripQueryDTO): Promise<Trip[]> {
    try {
      // GENERATE QUERY /?start=DATE&end=DATE&from=CITY&to=CITY

      return await this.tripRepository.findAll(queryObj);
    } catch (err) {
      throw new Error(`Couldn't get any trip: ${err.message}`);
    }
  }

  public async getById(tripId: number): Promise<Trip> {
    const trips = await this.tripRepository.findById(tripId);

    return trips;
  }

  public async update(id: number, fields: UpdateTripDTO): Promise<Trip> {
    return await this.tripRepository.save({ id, ...fields } as Trip);
  }

  public async delete(id: number): Promise<Trip> {
    return await this.tripRepository.remove({ id } as Trip);
  }

  private tripFactory(tripDto: TripDTO): Trip {
    const trip = new Trip();

    trip.from = tripDto.from;
    trip.to = tripDto.to;
    trip.date = tripDto.date;
    trip.totalSeats = tripDto.seats;
    trip.seatsLeft = tripDto.seats;
    trip.company = { id: tripDto.companyId } as Company;

    return trip;
  }
}
