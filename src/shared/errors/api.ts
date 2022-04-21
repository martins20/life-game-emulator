export class ApiError extends Error {
  readonly name: string;

  constructor(readonly message: string, readonly statusCode: number = 400) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this.constructor);
  }
}
