import { Response, NextFunction } from "express";
import { IRequest } from "../@types/express/request";

export function ensureIsEmployeeOfCompany(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      role,
      company: { id },
    } = req.user;

    const isEmployee = role === "employee";
    if (!isEmployee) throw new Error("You are not an employee");

    const { companyId } = req.body;

    if (companyId !== id) throw new Error("You don't work for this company");

    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: `Access denied: ${err}.`,
    });
  }
}
