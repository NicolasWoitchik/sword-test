import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import ListTechTasksService from '@modules/tasks/services/ListTechTasks';
import ListManagerTaskService from '@modules/tasks/services/ListManagerTasks';
import VerifyRoleService from '@modules/roles/services/VerifyRole';
import RolesEnum from '@modules/roles/enums/RolesEnum';
import CreateTechTaskService from '@modules/tasks/services/CreateTechTasks';
import AppError from '@shared/errors/AppError';
import ShowTechTaskService from '@modules/tasks/services/ShowTechTask';
import ShowManagerTaskService from '@modules/tasks/services/ShowManagerTask';
import UpdateTechTaskService from '@modules/tasks/services/UpdateTechTasks';
import DeleteManagerTaskService from '@modules/tasks/services/DeleteManagerTask';

class TasksController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id: user_id, role_id } = req.user;

    const listTechService = container.resolve(ListTechTasksService);
    const listManagerService = container.resolve(ListManagerTaskService);

    const verifyRole = container.resolve(VerifyRoleService);

    const role = verifyRole.execute({
      role_id,
    });

    if (role === RolesEnum.MANAGER) {
      const response = await listManagerService.execute();

      return res.json(classToClass(response));
    }

    const response = await listTechService.execute({
      user_id,
    });

    return res.json(classToClass(response));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id: user_id, role_id } = req.user;
    const { body } = req;

    const createTechService = container.resolve(CreateTechTaskService);

    const verifyRole = container.resolve(VerifyRoleService);

    const role = verifyRole.execute({
      role_id,
    });

    if (role === RolesEnum.MANAGER) throw new AppError(`Permission denied`);

    const response = await createTechService.execute({
      name: body.name,
      summary: body.summary,
      user_id,
    });

    return res.json(classToClass(response));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id: user_id, role_id } = req.user;
    const { id: task_id } = req.params;

    const showTechService = container.resolve(ShowTechTaskService);
    const showManagerService = container.resolve(ShowManagerTaskService);

    const verifyRole = container.resolve(VerifyRoleService);

    const role = verifyRole.execute({
      role_id,
    });

    if (role === RolesEnum.MANAGER) {
      const response = await showManagerService.execute({ task_id: +task_id });

      return res.json(classToClass(response));
    }

    const response = await showTechService.execute({
      user_id,
      task_id: +task_id,
    });

    return res.json(classToClass(response));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: user_id, role_id } = req.user;
    const { id: task_id } = req.params;
    const { body } = req;

    const updateTechService = container.resolve(UpdateTechTaskService);

    const verifyRole = container.resolve(VerifyRoleService);

    const role = verifyRole.execute({
      role_id,
    });

    if (role === RolesEnum.MANAGER) throw new AppError(`Permission denied`);

    const response = await updateTechService.execute({
      user_id,
      task_id: +task_id,
      name: body.name,
      summary: body.summary,
      finished: body.finished,
    });

    return res.json(classToClass(response));
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { role_id } = req.user;
    const { id: task_id } = req.params;

    const deleteManagerService = container.resolve(DeleteManagerTaskService);

    const verifyRole = container.resolve(VerifyRoleService);

    const role = verifyRole.execute({
      role_id,
    });

    if (role === RolesEnum.TECHNICIAM) throw new AppError(`Permission denied`);

    const response = await deleteManagerService.execute({
      task_id: +task_id,
    });

    return res.json(classToClass(response));
  }
}

export default TasksController;
