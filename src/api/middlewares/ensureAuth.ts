import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub: id } = verify(
      token,
      'efa15263cc615178c864f8449ab67c51',
    ) as IPayload;

    request.user = {
      id,
    };

    next();
  } catch (err) {
    return response.status(401).end();
  }
}
