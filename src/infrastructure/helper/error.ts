export class CustomError extends Error {
  public code: number;
  public details?: unknown;

  constructor(message: string, code: number, details?: unknown) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    this.details = details;
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string, details?: unknown) {
    super(message, 500, details);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, details?: unknown) {
    super(message, 400, details);
  }
}

export class AuthError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}


export interface ErrorInterface extends Error {
  code: number;
  details?: unknown;
}