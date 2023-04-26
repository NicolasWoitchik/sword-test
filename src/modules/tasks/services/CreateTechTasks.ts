import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITasksRepository from '../repositories/ITasksRepository';
import Task from '../infra/typeorm/entities/Task';
import ICreateTaskDTO from '../dtos/CreateTaskDTO';

@injectable()
class CreateTechTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  public async execute({
    name,
    summary,
    user_id,
  }: ICreateTaskDTO): Promise<Task> {
    if (!name) throw new AppError('Task name is required', 401);

    if (!summary) throw new AppError('Task summary is required', 401);

    const task = await this.tasksRepository.create({
      name,
      summary,
      user_id,
    });

    return task;
  }
}

export default CreateTechTaskService;
