import { TripDTO, TripQueryDTO } from "../@types/dto/TripDto";
import { Trip } from "models/TripEntity";
import { ITripRepository } from "repositories/TripRepository";
import Container, { Inject, Service } from "typedi";
import { CompanyService } from "./CompanyService";
import { UserService } from "./UserService";

export interface ITripService {
  create(tripDto: TripDTO): Promise<Trip>;
  bookSeat(tripId: number, userId: number): Promise<Trip>;
  getAll(queryObj: any): Promise<Trip[]>;
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

  public async bookSeat(tripId: number, userId: number): Promise<Trip> {
    try {
      const userService = Container.get<UserService>("UserService");

      const trip = await this.get(tripId);
      if (trip.seatsLeft === 0) throw new Error("No seats left");

      const user = await userService.get(userId);

      trip.seatsLeft -= 1;
      trip.users = [...trip.users, user];

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

  public async get(tripId: number): Promise<Trip> {
    const trips = await this.tripRepository.findById(tripId);

    return trips;
  }

  private async tripFactory(tripDto: TripDTO): Promise<Trip> {
    const trip = new Trip();

    trip.from = tripDto.from;
    trip.to = tripDto.to;
    trip.date = tripDto.date;
    trip.totalSeats = tripDto.seats;
    trip.seatsLeft = tripDto.seats;

    const companyService = Container.get<CompanyService>("CompanyService");
    const company = await companyService.get(tripDto.companyId);

    trip.company = company;

    return trip;
  }
}
