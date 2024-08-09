import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      statusCode,
      message: this.getErrorMessage(exception)
    });
  }

  private getErrorMessage(exception: HttpException): string {
    if (exception.message && typeof exception.message === 'string') {
      return exception.message;
    }
    if (
      exception.getResponse() &&
      typeof exception.getResponse() === 'string'
    ) {
      return exception.message;
    }
    if (
      exception.getResponse() &&
      typeof exception.getResponse() === 'object'
    ) {
      return exception.getResponse()['message'] || 'An error occurred';
    }
    return 'Internal server error';
  }

  private getErrorDetails(exception: HttpException): any {
    if (
      exception.getResponse() &&
      typeof exception.getResponse() === 'object'
    ) {
      return exception.getResponse()['errorDetails'] || null;
    }
    return null;
  }
}
