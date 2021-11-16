import Container, { Inject, Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { IUserService } from "../@types/services/IUserService";
import { UserService } from "services/UserService";

@Service("UserController")
export class UserController {
  constructor(@Inject("UserService") private userService: IUserService) {}

  public async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body;

      const userWithoutPassword = await this.userService.createEmployee(user);

      res.status(200).json({
        status: "success",
        data: {
          userWithoutPassword,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body;

      const userService = Container.get<UserService>("UserService");

      const userWithoutPassword = await userService.createAdmin(user);

      res.status(200).json({
        status: "success",
        data: {
          userWithoutPassword,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async createPassenger(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user } = req.body;

      const userService = Container.get<UserService>("UserService");

      const userWithoutPassword = await userService.createPassenger(user);

      res.status(200).json({
        status: "success",
        data: {
          userWithoutPassword,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userService = Container.get<UserService>("UserService");

      const { user, token } = await userService.authenticate(email, password);

      res.status(200).json({
        status: "success",
        data: {
          user,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  // async list(request: Request, response: Response) {
  //   const users = await this.userService.listar();
  //   response.send(users);
  // }

  // async get(request: Request, response: Response) {
  //   const user = await this.userService.buscar(Number(request.params.id));
  //   response.send(user);
  // }

  // async create(request: Request, response: Response) {
  //   const user = await this.userService.criar(request.body);
  //   response.send(user);
  // }

  // async update(request: Request, response: Response) {
  //   const user = await this.userService.atualizar(
  //     Number(request.params.id),
  //     request.body
  //   );
  //   response.send(user);
  // }

  // async remove(request: Request, response: Response) {
  //   await this.userService.remover(Number(request.params.id));
  //   response.send();
  // }
}
