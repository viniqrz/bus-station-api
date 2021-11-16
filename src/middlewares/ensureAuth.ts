import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "helpers/verifyJwt";
import { JwtPayload } from "jsonwebtoken";

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const bearer = req.headers.authorization;
    const { user_id } = req.query;

    if (!bearer) throw new Error("No token sent");

    const [, token] = bearer.split(" ");

    const { data } = verifyJwt(token) as JwtPayload;

    const isAuthenticated = user_id === data.id;

    if (!isAuthenticated) throw new Error("Invalid credentials");

    return next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: `Access denied: ${err}.`,
    });
  }
}
