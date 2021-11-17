import { UserDTO, UserWithoutPassword } from "../dto/UserDto";
import { User } from "../../models/UserEntity";

export interface IUserService {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<UserWithoutPassword>;
  create(usuarioDto: UserDTO): Promise<User>;
  update(id: number, usuarioDto: UserDTO): Promise<void>;
  delete(id: number): Promise<void>;
  createPassenger(userDto: UserDTO): Promise<UserWithoutPassword>;
  createEmployee(userDto: UserDTO): Promise<UserWithoutPassword>;
  createAdmin(userDto: UserDTO): Promise<UserWithoutPassword>;
  signup(userDto: UserDTO): Promise<UserWithoutPassword>;
  authenticate(
    email: string,
    password: string
  ): Promise<{ user: UserWithoutPassword; token: string }>;
}
