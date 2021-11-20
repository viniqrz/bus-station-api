import { IUserRepository } from "../@types/repositories/IUserRepository";
import { UserDTO, UserWithoutPassword } from "../@types/dto/UserDto";
import { IUserService } from "../@types/services/IUserService";
import Container, { Inject, Service } from "typedi";
import { CompanyService } from "./CompanyService";
import { generateJwt } from "../helpers/generateJwt";
import { User } from "../models/UserEntity";
import { compare, hash } from "bcrypt";
import { createHash } from "crypto";

@Service("UserService")
export class UserService implements IUserService {
  private JWT_EXPIRATION_TIME = "6h";

  constructor(
    @Inject("UserRepository") private userRepository: IUserRepository
  ) {}

  public async createAdmin(userDto: UserDTO): Promise<UserWithoutPassword> {
    try {
      const dtoIsAdmin = userDto.role === "admin";

      if (!dtoIsAdmin) throw new Error("user sent is not admin");

      return await this.signup(userDto);
    } catch (err) {
      throw new Error(`Couldn't create user: ${err.message}.`);
    }
  }

  public async createEmployee(userDto: UserDTO): Promise<UserWithoutPassword> {
    try {
      const isEmployee = userDto.role === "employee";
      const hasCompany = typeof userDto.companyId === "number";

      if (!isEmployee) throw new Error("user sent is not employee");

      if (!hasCompany) throw new Error("user sent has no company");

      return await this.signup(userDto);
    } catch (err) {
      throw new Error(`Couldn't create user: ${err.message}.`);
    }
  }

  public async createPassenger(userDto: UserDTO): Promise<UserWithoutPassword> {
    try {
      const isPassenger = userDto.role === "passenger";

      if (!isPassenger) throw new Error("user sent is not passenger");

      return await this.signup(userDto);
    } catch (err) {
      throw new Error(`Couldn't create user: ${err.message}.`);
    }
  }

  public async signup(userDto: UserDTO): Promise<UserWithoutPassword> {
    const { email, password } = userDto;

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) throw new Error("User already exists");

    const hashedPassword = await hash(password, 8);

    const user = await this.userFactory({
      ...userDto,
      password: hashedPassword,
    });

    const savedUser = await this.create(user);
    const userWithoutPassword = this.omitPassword(savedUser);

    return userWithoutPassword;
  }

  public async authenticate(
    email: string,
    password: string
  ): Promise<{ user: UserWithoutPassword; token: string }> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new Error("User or password incorrect");

      const match = await compare(password, user.password);
      if (!match) throw new Error("User or password incorrect");

      const token = generateJwt(user, this.JWT_EXPIRATION_TIME);
      const userWithoutPassword = this.omitPassword(user);

      return { user: userWithoutPassword, token };
    } catch (err) {
      throw new Error(`Couldn't authenticate user: ${err.message}.`);
    }
  }

  public async getAll() {
    return this.userRepository.find();
  }

  public async getById(id: number): Promise<UserWithoutPassword> {
    return this.omitPassword(await this.userRepository.findOne(id));
  }

  public async create(userDto: User) {
    return this.userRepository.save(userDto);
  }

  public async update(
    id: number,
    userDto: UserDTO
  ): Promise<UserWithoutPassword> {
    if ("password" in userDto) {
      userDto.password = await hash(userDto.password, 8);
    }

    const user = await this.userRepository.save({ ...userDto, id } as User);

    return this.omitPassword(user);
  }

  public async delete(id: number): Promise<User> {
    return await this.userRepository.remove({ id } as User);

    // if (!userToRemove) {
    //   throw new Error("User not found!");
    // }

    // await this.userRepository.remove(userToRemove);
  }

  private omitPassword(user: User): UserWithoutPassword {
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  private async userFactory(userDto: UserDTO): Promise<User> {
    const user = new User();

    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.password = userDto.password;
    user.company = null;
    user.role = userDto.role;

    if (userDto.role === "employee") {
      const companyService = Container.get<CompanyService>("CompanyService");

      const company = await companyService.getById(userDto.companyId);

      if (!company) throw new Error("Company doesnt exist");

      user.company = company;
    }

    return user;
  }
}
