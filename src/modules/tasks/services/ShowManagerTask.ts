import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITasksRepository from '../repositories/ITasksRepository';
import Task from '../infra/typeorm/entities/Task';

interface IRequest {
  task_id: number;
}

@injectable()
class ShowManagerTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  public async execute({ task_id }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new AppError('Task not found', 401);
    }

    return task;
  }
}

export default ShowManagerTaskService;
