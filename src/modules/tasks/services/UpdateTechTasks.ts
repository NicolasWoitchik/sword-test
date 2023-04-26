import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITransporterProvider from '@shared/container/providers/TransporterProvider/models/ITransporterProvider';
import TransporterTopics from '@shared/enums/TransporterTopics';
import ITasksRepository from '../repositories/ITasksRepository';
import Task from '../infra/typeorm/entities/Task';
import IUpdateTaskDTO from '../dtos/UpdateTaskDTO';

@injectable()
class UpdateTechTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
    @inject('TransporterProvider')
    private transporterProvider: ITransporterProvider
  ) {}

  public async execute({
    name,
    summary,
    user_id,
    task_id,
    finished,
  }: IUpdateTaskDTO): Promise<Task> {
    const exists = await this.tasksRepository.findByIdAndUserId(
      task_id,
      user_id
    );

    if (!exists) throw new AppError('Task not found', 404);

    if (exists.performedAt)
      throw new AppError(
        `Task finished at ${exists.performedAt}. You can't do anything else`,
        401
      );

    const task = await this.tasksRepository.save(task_id, {
      name,
      summary,
      user_id,
      performedAt: finished ? new Date() : undefined,
    });

    if (task.performedAt) {
      await this.transporterProvider.publish(
        TransporterTopics.USER_NOTIFICATION,
        {
          user_id,
          task_id,
          performedAt: task.performedAt,
        }
      );
    }

    return task;
  }
}

export default UpdateTechTaskService;
