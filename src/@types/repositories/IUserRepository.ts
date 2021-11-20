import { UserDTO } from "../dto/UserDto";
import { User } from "../../models/UserEntity";

export interface IUserRepository {
  find(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  save(userDto: UserDTO): Promise<User>;
  remove(entity: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
