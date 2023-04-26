import { injectable, inject } from 'tsyringe';

import ITasksRepository from '../repositories/ITasksRepository';
import Task from '../infra/typeorm/entities/Task';

interface IRequest {
  user_id: number;
}

@injectable()
class ListTechTasksService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAllByUserId(user_id);

    return tasks;
  }
}

export default ListTechTasksService;
