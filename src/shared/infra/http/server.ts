import 'reflect-metadata';
import 'dotenv/config';

import { container } from 'tsyringe';
import Start from '../../services';
import App, { logger } from './app';

const app = new App();

const start = container.resolve(Start);

const port = Number(process.env.PORT) || 3000;

app.start(port, () =>
  start
    .start()
    .then(() => logger.info(`Start listening on port ${port}`))
    .catch(() => process.exit(-1))
);
