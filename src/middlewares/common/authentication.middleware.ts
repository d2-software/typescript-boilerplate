import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { FORBIDDEN, UNAUTHORIZED } from 'http-status';
import { Middleware } from '../middleware';
import { Token } from '../../libs/token';
import { ApiException } from '../../errors/api.exception';

export default class AuthenticationMiddleware implements Middleware {
  async run(req: Request, res: Response, next: NextFunction) {
    const authToken = req.header('Authorization');
    let decodedToken;

    try {
      decodedToken = Token.verify(authToken);
    } catch (error) {
      let transformedError = error;

      if (error instanceof TokenExpiredError || error instanceof NotBeforeError) {
        transformedError = new ApiException(error.message, FORBIDDEN);
      } else if (error instanceof JsonWebTokenError) {
        transformedError = new ApiException(error.message, UNAUTHORIZED);
      }

      throw transformedError;
    }

    req.user = decodedToken;
    next();
  }
}
