import { UserWithoutPassword } from "../dto/UserDto";
import { Request } from "express";

export interface IRequest extends Request {
  user: UserWithoutPassword;
}
