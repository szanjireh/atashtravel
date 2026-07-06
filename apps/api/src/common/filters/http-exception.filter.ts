import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';
    let code = 'INTERNAL_SERVER_ERROR';

    // Handle HTTP exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        message = (exceptionResponse as any).message || exceptionResponse;
      }
      code = exception.name;
    }
    // Handle Prisma errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      code = exception.code;

      switch (exception.code) {
        case 'P2002':
          message = 'Unique constraint violation';
          status = HttpStatus.CONFLICT;
          break;
        case 'P2025':
          message = 'Record not found';
          status = HttpStatus.NOT_FOUND;
          break;
        case 'P2003':
          message = 'Foreign key constraint violation';
          break;
        case 'P2014':
          message = 'Invalid relation';
          break;
        default:
          message = 'Database error';
      }
    }
    // Handle Prisma validation errors
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation error';
      code = 'VALIDATION_ERROR';
    }
    // Handle unknown errors
    else if (exception instanceof Error) {
      message = exception.message;
      code = exception.name;
    }

    // Log the error
    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : exception,
    );

    // Send response
    response.status(status).json({
      statusCode: status,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    });
  }
}
