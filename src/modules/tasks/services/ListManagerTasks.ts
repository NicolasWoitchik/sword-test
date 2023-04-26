import { injectable, inject } from 'tsyringe';

import ITasksRepository from '../repositories/ITasksRepository';
import Task from '../infra/typeorm/entities/Task';

@injectable()
class ListManagerTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  public async execute(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAll();

    return tasks;
  }
}

export default ListManagerTaskService;
