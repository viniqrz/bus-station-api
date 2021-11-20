import * as express from "express";
import createUserRouter from "./userRouter";
import createCompanyRouter from "./companyRouter";
import createTripRouter from "./tripRouter";

const createRouters = (app: express.Express) => {
  app.use("/users", createUserRouter());
  app.use("/companies", createCompanyRouter());
  app.use("/trips", createTripRouter());
};

export default createRouters;
