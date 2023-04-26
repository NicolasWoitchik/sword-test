import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  task_id: number;
}

@injectable()
class DeleteManagerTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  public async execute({ task_id }: IRequest): Promise<boolean> {
    const exists = await this.tasksRepository.findById(task_id);

    if (!exists) throw new AppError('Task not found', 404);

    await this.tasksRepository.delete(task_id);

    return true;
  }
}

export default DeleteManagerTaskService;
