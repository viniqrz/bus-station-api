import { NextFunction, Response } from "express";
import { Inject, Service } from "typedi";
import { ITripService } from "services/TripService";
import { IRequest } from "../@types/express/request";

@Service("TripController")
export class TripController {
  constructor(@Inject("TripService") private tripService: ITripService) {}

  public async create(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { trip } = req.body;

      const savedTrip = await this.tripService.create(trip);

      res.status(200).json({
        status: "success",
        data: {
          trip: savedTrip,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async getAll(req: IRequest, res: Response, next: NextFunction) {
    try {
      const queryObj = req.query;

      const trips = await this.tripService.getAll(queryObj);

      res.status(200).json({
        status: "success",
        data: trips,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { tripId } = req.params;

      const savedTrip = await this.tripService.getById(Number(tripId));

      res.status(200).json({
        status: "success",
        data: {
          trip: savedTrip,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async update(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { tripId } = req.params;
      const { trip } = req.body;

      const updatedTrip = await this.tripService.update(Number(tripId), trip);

      res.status(200).json({
        status: "success",
        data: {
          trip: updatedTrip,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async delete(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { tripId } = req.params;

      const trip = await this.tripService.delete(Number(tripId));

      res.status(200).json({
        status: "success",
        data: {
          trip,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async bookSeatByPassenger(
    req: IRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        user,
        params: { tripId },
      } = req;

      const savedTrip = this.tripService.bookSeat(
        Number(tripId),
        Number(user.id)
      );

      res.status(200).json({
        status: "success",
        data: {
          trip: savedTrip,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async bookSeatByEmployee(
    req: IRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { trip_id } = req.query;
      const { user_id } = req.body;

      const savedTrip = this.tripService.bookSeat(
        Number(trip_id),
        Number(user_id),
        req.user.company.id
      );

      res.status(200).json({
        status: "success",
        data: {
          trip: savedTrip,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
