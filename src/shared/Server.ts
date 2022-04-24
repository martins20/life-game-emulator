import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import express, { Express } from "express";

import { apiRoutes } from "./infra/http/routes/index.routes";
import HandleErrorsMiddleware from "./infra/http/middlewares/hanlde-errors";

const isTest = !!process.env.IS_TEST;

import(`./containers${isTest ? "/fakes" : ""}`);

class Server {
  api: Express;

  constructor() {
    this.api = express();

    this.startApi();
  }

  private startApi(): void {
    this.middlewares();
    this.useRoutes();

    this.handleErrors();
  }

  private middlewares(): void {
    this.api.use(express.json());
  }

  private useRoutes(): void {
    this.api.use(apiRoutes);
  }

  private handleErrors(): void {
    const handleErrors = HandleErrorsMiddleware.getInstance();

    this.api.use(handleErrors.execute);
  }
}

export const { api } = new Server();
