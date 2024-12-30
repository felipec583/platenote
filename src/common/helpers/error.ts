import { ZodError } from "zod";
import { PSQL_ERRORS } from "../psql_error_mapping.js";
import { jwtErrorTypes } from "../jwt_error_mapping.js";
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

export class ValidationError extends ZodError {}

export class DatabaseError extends BaseError {
  public readonly instance: string = "";
  public readonly statusCode: number = 0;
  constructor(public readonly code: string, public readonly detail: string) {
    super(detail);
    this.code = code;
    this.detail = detail;
  }

  getFormattedError(instance: string): GenericErrorI {
    const formattedInstance = instance.split("/").pop();
    const errorContent = PSQL_ERRORS.get(this.code);
    return {
      statusCode: errorContent?.statusCode ?? 400,
      message: errorContent?.message ?? this.detail,
      instance: `/${formattedInstance}`,
    };
  }
}

export class jwtError extends BaseError {
  public readonly instance: string = "";

  readonly statusCode: number = 400;
  constructor(
    public readonly message: string,
    readonly errorName: jwtErrorTypes
  ) {
    super(message);
    this.errorName = errorName;
  }

  getFormattedError(instance: string): GenericErrorI {
    const formattedInstance = instance.split("/").pop();
    // Change status code depending on jwt error name (there are three)
    return {
      statusCode: this.statusCode,
      message: this.message,
      instance: `/${formattedInstance}`,
    };
  }
}
