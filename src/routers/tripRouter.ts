import Container from "typedi";

import { TripController } from "../controllers/TripController";
import { ensureIsUser } from "../middlewares/ensureIsUser";
import { ensureIsEmployee } from "../middlewares/ensureIsEmployee";
import { Router } from "express";
import { ensureIsEmployeeOfCompany } from "../middlewares/ensureIsEmployeeOfCompany";

const router = Router();

const getController = (): TripController => {
  return Container.get<TripController>("TripController");
};

const createRouter = () => {
  const controller = getController();

  router.post("", ensureIsUser, ensureIsEmployeeOfCompany, controller.create);
  router.get("", ensureIsUser, controller.getAll);
  router.get("/:id", ensureIsUser, controller.getById);
  router.patch("/:id", ensureIsUser, ensureIsEmployee, controller.update);
  router.delete("/:id", ensureIsUser, ensureIsEmployee, controller.delete);
  router.delete("/:id", ensureIsUser, ensureIsEmployee, controller.delete);

  router.post(
    "/:id/book/passenger",
    ensureIsUser,
    controller.bookSeatByPassenger
  );

  router.post(
    "/:id/book/employee",
    ensureIsUser,
    ensureIsEmployee,
    controller.bookSeatByEmployee
  );

  return router;
};

export default createRouter;
