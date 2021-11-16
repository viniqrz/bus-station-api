import { Response, NextFunction } from "express";
import { verifyJwt } from "helpers/verifyJwt";
import { JwtPayload } from "jsonwebtoken";
import { IRequest } from "../@types/express/request";

export function ensureIsColleague(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) throw new Error("No token sent");

    const [, token] = bearer.split(" ");
    const { data } = verifyJwt(token) as JwtPayload;
    req.user = data;

    const isEmployee = data.role === "employee";
    if (!isEmployee) throw new Error("You are not an employee");

    const { companyId } = req.params;

    const worksAtCompany = Number(companyId) === req.user.company.id;
    if (!worksAtCompany)
      throw new Error("Trip sent belongs to another company");

    return next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: `Access denied: ${err}.`,
    });
  }
}
