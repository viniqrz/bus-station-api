import Container from "typedi";

import { ensureIsColleagueOrAdmin } from "../middlewares/ensureIsColleague";
import { ensureIsOwner } from "../middlewares/ensureIsOwner";
import { ensureIsUser } from "../middlewares/ensureIsUser";
import { UserController } from "../controllers/UserController";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import { Router } from "express";

const router = Router();

const getController = (): UserController => {
  return Container.get<UserController>("UserController");
};

const createRouter = () => {
  const controller = getController();

  router.post("", controller.createPassenger);
  router.get("", ensureIsUser, ensureIsAdmin, controller.getAll);
  router.get("/:id", ensureIsUser, controller.getById);
  router.patch("/:id", ensureIsUser, ensureIsOwner, controller.update);
  router.delete("/:id", ensureIsUser, ensureIsAdmin, controller.delete);

  router.post("/authenticate", controller.authenticate);

  router.post(
    "/employee",
    ensureIsUser,
    ensureIsColleagueOrAdmin,
    controller.createEmployee
  );

  router.post("/admin", ensureIsUser, ensureIsAdmin, controller.createAdmin);

  return router;
};

export default createRouter;
