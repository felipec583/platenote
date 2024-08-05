export interface GenericErrorI {
  statusCode: number;
  message: string;
  instance: string;
}

export abstract class BaseError extends Error {
  abstract readonly statusCode: number;
  abstract readonly instance: string;
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  abstract getFormattedError(instance: string): GenericErrorI;
}

export class HttpError extends BaseError {
  readonly instance: string = "";
  constructor(message: string, readonly statusCode: number = 500) {
    super(message);
  }

  getFormattedError(instance: string): GenericErrorI {
    const formattedInstance = instance.split("/").pop();
    return {
      statusCode: this.statusCode,
      message: this.message,
      instance: `/${formattedInstance}`,
    };
  }
}

// export class ValidationError extends BaseError {}
