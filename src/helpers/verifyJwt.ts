import * as dotenv from "dotenv";
import { verify } from "jsonwebtoken";
dotenv.config();

export function verifyJwt(token: string) {
  return verify(token, process.env.JWT_SECRET);
}
