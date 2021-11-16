import { UserDTO, UserWithoutPassword } from "../dto/UserDto";
import { User } from "../../models/UserEntity";

export interface IUserService {
  getAll(): Promise<User[]>;
  get(id: number): Promise<User>;
  create(usuarioDto: UserDTO): Promise<User>;
  update(id: number, usuarioDto: UserDTO): Promise<void>;
  remove(id: number): Promise<void>;
  signup(userDto: UserDTO): Promise<UserWithoutPassword>;
  authenticate(
    email: string,
    password: string
  ): Promise<{ user: UserWithoutPassword; token: string }>;
}
