import 'reflect-metadata';
import express, { Request, Response, NextFunction, response } from 'express';

import './database';
import { router } from './routes';
import { AppError } from './errors/AppError';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/v1', router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(port, () => console.log(`Server listening on port ${port}`));
