export type ExtensionsWithOriginalError = {
  originalError: ErrorResponse;
};

export type ErrorResponse = {
  message: string | Array<string>;
  statusCode: ErrorStatusCode;
  error: string;
};

export enum ErrorStatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  RequestTimeout = 408,
  Conflict = 409,
  InternalServerError = 500,
}
