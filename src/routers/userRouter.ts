import { Router } from "express";
import { ensureIsColleagueOrAdmin } from "middlewares/ensureIsColleague";
import { ensureIsOwner } from "middlewares/ensureIsOwner";
import { ensureIsPassenger } from "middlewares/ensureIsPassenger";
import Container from "typedi";
const router = Router();
import { UserController } from "../controllers/UserController";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const getController = (): UserController => {
  return Container.get<UserController>("UserController");
};

const crateRouter = () => {
  const controller = getController();

  router.post("", controller.createPassenger);
  router.get("", ensureIsAdmin, controller.getAll);
  router.get("/:id", controller.getById);
  router.patch("/:id", ensureIsPassenger, ensureIsOwner, controller.update);
  router.delete("/:id", ensureIsAdmin, controller.delete);

  router.post("/authenticate", controller.authenticate);

  router.post("/employee", ensureIsColleagueOrAdmin, controller.createEmployee);
  router.post("/admin", ensureIsAdmin, controller.createAdmin);

  return router;
};

export default crateRouter;
