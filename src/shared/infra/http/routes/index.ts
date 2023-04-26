import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';
import { errors } from 'celebrate';

const routes = Router();

routes.get('/health', (req, res) => {
  return res.json({ up: true });
});

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/tasks', tasksRouter);
routes.use(errors());

export default routes;
