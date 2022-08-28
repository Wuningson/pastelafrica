import { Response } from 'express';
import CustomError from './custom-error';

export default async function (err: any, res: Response) {
  const response: ErrorResponse = { status: false };
  let statusCode = 500;
  if (err instanceof Error) {
    response.message = err.message;
  } else if (err instanceof CustomError) {
    response.message = err.message;
    statusCode = err.code;
  } else {
    response.message = 'something went wrong';
  }

  return res.status(statusCode).json(response);
}
