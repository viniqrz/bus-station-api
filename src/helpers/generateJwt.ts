import { UserWithoutPassword } from "../@types/dto/UserDto";
import { sign } from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

export function generateJwt(user: UserWithoutPassword, expirationTime: string) {
  return sign(
    {
      data: user,
    },
    process.env.JWT_SECRET,
    { expiresIn: expirationTime }
  );
}
