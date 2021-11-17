import { NextFunction, Response } from "express";
import { IRequest } from "../@types/express/request";

export function ensureIsOwner(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    if (Number(userId) !== req.user.id) throw new Error("Not owner");

    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: `Access denied: ${err}.`,
    });
  }
}
