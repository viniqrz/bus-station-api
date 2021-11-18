import { Response, NextFunction } from "express";
import { IRequest } from "../@types/express/request";

export function ensureIsEmployee(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const isEmployee = req.user.role === "employee";
    if (!isEmployee) throw new Error("You are not an employee");

    return next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: `Access denied: ${err}.`,
    });
  }
}
