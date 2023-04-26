import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { Logger } from 'tslog';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';

import routes from '../routes';

export const logger = new Logger({
  prefix: ['[SwordTest]'],
});

class App {
  public app: Express;

  constructor() {
    this.app = express();
  }

  async start(port: number, callback?: () => void): Promise<void> {
    await this.middlewares();
    await this.routes();
    await this.errors();
    await this.app.listen(port, callback);
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.disable('x-powered-by');
  }

  routes(): void {
    this.app.use(routes);
  }

  errors(): void {
    routes.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error(err);
        if (res.headersSent) {
          return next(err);
        }

        if (err instanceof AppError) {
          return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        return res.status(500).json({
          status: 'error',
          message: 'Interal Server Error',
        });
      }
    );
  }
}

export default App;
