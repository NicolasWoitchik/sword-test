import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Joi, Segments, celebrate } from 'celebrate';
import TasksController from '../controllers/TasksController';

const routes = Router();

const tasksController = new TasksController();

routes.use(ensureAuthenticated);

routes.get('/', tasksController.index);
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      summary: Joi.string().required(),
    }),
  }),
  tasksController.create
);
routes.get('/:id', tasksController.show);
routes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      summary: Joi.string().required(),
      finished: Joi.bool().default(false),
    }),
  }),
  tasksController.update
);
routes.delete('/:id', tasksController.destroy);

export default routes;
