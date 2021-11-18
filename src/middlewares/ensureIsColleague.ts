import { Response, NextFunction } from "express";
import { IRequest } from "../@types/express/request";

export function ensureIsColleagueOrAdmin(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const isEmployee = req.user.role === "employee";
    const isAdmin = req.user.role === "admin";

    if (!isEmployee && !isAdmin) throw new Error("You arent employee or admin");

    const { user } = req.body;

    if (isEmployee) {
      const isColleague = user.companyId === req.user.company.id;
      if (!isColleague) throw new Error("User sent belongs to another company");
    }

    return next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: `Access denied: ${err}.`,
    });
  }
}
