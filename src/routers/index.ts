import * as express from "express";
import createUserRouter from "./userRouter";

const createRouters = (app: express.Express) => {
  app.use("/users", createUserRouter());
};

export default createRouters;
