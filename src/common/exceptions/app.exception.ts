import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    private readonly code: string = 'APP_ERROR',
  ) {
    super({ message, code }, status);
  }

  getCode(): string {
    return this.code;
  }
}

export class BadRequestException extends AppException {
  constructor(message: string = 'Bad request', code: string = 'BAD_REQUEST') {
    super(message, HttpStatus.BAD_REQUEST, code);
  }
}

export class UnauthorizedException extends AppException {
  constructor(message: string = 'Unauthorized', code: string = 'UNAUTHORIZED') {
    super(message, HttpStatus.UNAUTHORIZED, code);
  }
}

export class ForbiddenException extends AppException {
  constructor(message: string = 'Forbidden', code: string = 'FORBIDDEN') {
    super(message, HttpStatus.FORBIDDEN, code);
  }
}

export class NotFoundException extends AppException {
  constructor(message: string = 'Resource not found', code: string = 'NOT_FOUND') {
    super(message, HttpStatus.NOT_FOUND, code);
  }
}

export class ConflictException extends AppException {
  constructor(message: string = 'Resource already exists', code: string = 'CONFLICT') {
    super(message, HttpStatus.CONFLICT, code);
  }
}

export class InternalServerErrorException extends AppException {
  constructor(message: string = 'Internal server error', code: string = 'INTERNAL_ERROR') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, code);
  }
}
