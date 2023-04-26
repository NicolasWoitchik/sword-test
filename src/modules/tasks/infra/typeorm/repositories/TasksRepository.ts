import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import { getRepository, Repository } from 'typeorm';
import ICreateTaskDTO from '@modules/tasks/dtos/CreateTaskDTO';
import Task from '../entities/Task';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  async findAll(): Promise<Task[]> {
    return this.ormRepository.find({
      relations: ['user'],
    });
  }

  public async findById(id: number): Promise<Task | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findAllByUserId(user_id: number): Promise<Task[]> {
    return this.ormRepository.find({
      where: {
        user_id,
      },
    });
  }

  async findByIdAndUserId(
    task_id: number,
    user_id: number
  ): Promise<Task | undefined> {
    return this.ormRepository.findOne({
      where: {
        id: task_id,
        user_id,
      },
    });
  }

  public async create(data: ICreateTaskDTO): Promise<Task> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(task_id: number, user: Partial<Task>): Promise<Task> {
    await this.ormRepository.update(
      {
        id: task_id,
      },
      user
    );

    return this.findById(task_id);
  }

  async delete(task_id: number): Promise<boolean> {
    await this.ormRepository.delete({
      id: task_id,
    });

    return true;
  }
}

export default TasksRepository;
