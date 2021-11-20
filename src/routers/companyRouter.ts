import Container from "typedi";

import { CompanyController } from "../controllers/CompanyController";
import { Router } from "express";
import { ensureIsUser } from "../middlewares/ensureIsUser";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router();

const getController = (): CompanyController => {
  return Container.get<CompanyController>("CompanyController");
};

const createRouter = () => {
  const controller = getController();

  router.post("", ensureIsUser, ensureIsAdmin, controller.create);
  router.get("", ensureIsUser, controller.getAll);
  router.get("/:id", ensureIsUser, controller.getById);
  router.patch("/:id", ensureIsUser, ensureIsAdmin, controller.update);
  router.delete("/:id", ensureIsUser, ensureIsAdmin, controller.delete);

  return router;
};

export default createRouter;
