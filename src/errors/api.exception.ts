import httpStatus from 'http-status';

export class ApiException extends Error {
  readonly #code: number;

  constructor(message?: string, code?: number) {
    super(message);

    this.#code = code || httpStatus.INTERNAL_SERVER_ERROR;

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ApiException.prototype);
  }

  public get code(): number {
    return this.#code;
  }

  public toJson(): ({ code: number, message: string }) {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
