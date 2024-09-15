import { Request, Response, NextFunction } from "express";

import { BaseError } from "../common/helpers/error";

type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

type ErrorHandler = (
  error: Error | BaseError,

  req: Request,

  res: Response,

  next: NextFunction
) => void;

export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

type RequestQuery<T> = GenericQuery<T>;

type CustomRequest<Q> = Request<RequestParams, ResponseBody, RequestBody, Q>;

interface FindListsQuery {
  shift: number | undefined;
  start_date: string | undefined;

  end_date: string | undefined;
}

interface SearchPlateQuery {
  query: string;
}

export type FindListsRequestQuery = RequestQuery<FindListsQuery>;

export type SearchPlateRequestQuery = RequestQuery<SearchPlateQuery>;

type GenericQuery<T> = {
  [K in keyof T]: T[K];
};

interface Counter {
  numberPlates: number;

  hasLeft: number;

  isRegistered: number;

  isTenant: number;
}
