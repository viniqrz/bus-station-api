import { NextFunction, Response } from "express";
import { IRequest } from "../@types/express/request";

export function ensureIsAdmin(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const isAdmin = req.user.role === "admin";
    if (!isAdmin) throw new Error("User is not admin");

    return next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: `Access denied: ${err}.`,
    });
  }
}
