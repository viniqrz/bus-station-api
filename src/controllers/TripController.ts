import { NextFunction, Response } from "express";
import { Inject, Service } from "typedi";
import { ITripService } from "../services/TripService";
import { IRequest } from "../@types/express/request";

@Service("TripController")
export class TripController {
  constructor(@Inject("TripService") private tripService: ITripService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.bookSeatByEmployee = this.bookSeatByEmployee.bind(this);
    this.bookSeatByPassenger = this.bookSeatByPassenger.bind(this);
  }

  public async create(req: IRequest, res: Response, next: NextFunction) {
    try {
      const trip = req.body;

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
      const { id } = req.params;

      const savedTrip = await this.tripService.getById(Number(id));

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
      const { id } = req.params;
      const trip = req.body;

      const updatedTrip = await this.tripService.update(Number(id), trip);

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
      const { id } = req.params;

      const trip = await this.tripService.delete(Number(id));

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
        params: { id },
      } = req;

      const savedTrip = await this.tripService.bookSeat(
        Number(id),
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
      const { id } = req.params;
      const { user_id } = req.body;

      const savedTrip = await this.tripService.bookSeat(
        Number(id),
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
