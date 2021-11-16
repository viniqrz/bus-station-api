import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { ITripService } from "services/TripService";
import { IRequest } from "../@types/express/request";

@Service("TripController")
export class TripController {
  constructor(@Inject("TripService") private tripService: ITripService) {}

  public async getAll(req: IRequest, res: Response, next: NextFunction) {
    const queryObj = req.query;

    const savedTrip = await this.tripService.getAll(queryObj);

    res.status(200).json({
      status: "success",
      data: {
        trip: savedTrip,
      },
    });
  }

  public async create(req: IRequest, res: Response, next: NextFunction) {
    const { trip } = req.body;

    const savedTrip = await this.tripService.create(trip);

    res.status(200).json({
      status: "success",
      data: {
        trip: savedTrip,
      },
    });
  }

  public async bookSeat(req: IRequest, res: Response, next: NextFunction) {
    const { trip_id, user_id } = req.query;

    const savedTrip = this.tripService.bookSeat(
      Number(trip_id),
      Number(user_id)
    );

    res.status(200).json({
      status: "success",
      data: {
        trip: savedTrip,
      },
    });
  }
}
