import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: number;
  task_id: number;
  performedAt: Date;
}

@injectable()
class NotifyManagerService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  public async execute({
    user_id,
    task_id,
    performedAt,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new AppError('User not found', 401);
    }

    console.log(
      `\n\nThe tech '${user.firstName}' performed the task '${task.name}' on date ${performedAt}\n\n`
    );
  }
}

export default NotifyManagerService;
