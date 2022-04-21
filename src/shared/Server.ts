import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import express, { Express } from "express";

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

    this.handleErrors();
  }

  private middlewares(): void {
    this.api.use(express.json());
  }

  private handleErrors(): void {}
}

export const { api } = new Server();
