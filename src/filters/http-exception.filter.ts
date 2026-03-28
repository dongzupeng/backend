import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || message;
        code = (exceptionResponse as any).code || code;
      }
    } else if (exception.name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation error';
      code = 'VALIDATION_ERROR';
    } else if (exception.name === 'UnauthorizedError') {
      status = HttpStatus.UNAUTHORIZED;
      message = 'Unauthorized';
      code = 'UNAUTHORIZED';
    } else if (exception.name === 'ForbiddenError') {
      status = HttpStatus.FORBIDDEN;
      message = 'Forbidden';
      code = 'FORBIDDEN';
    } else if (exception.name === 'NotFoundError') {
      status = HttpStatus.NOT_FOUND;
      message = 'Resource not found';
      code = 'NOT_FOUND';
    } else if (exception.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      message = 'Resource already exists';
      code = 'CONFLICT';
    } else if (exception.code === 'P2025') {
      status = HttpStatus.NOT_FOUND;
      message = 'Resource not found';
      code = 'NOT_FOUND';
    }

    response
      .status(status)
      .json({
        statusCode: status,
        code,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
