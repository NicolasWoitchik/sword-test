import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ICreateTaskDTO from '@modules/tasks/dtos/CreateTaskDTO';
import ITasksRepository from '../ITasksRepository';

class FakeTasksRepository implements ITasksRepository {
  private tasks: Task[] = [];

  async findById(task_id: number): Promise<Task | undefined> {
    return this.tasks.find(item => item.id === task_id);
  }

  async findAllByUserId(user_id: number): Promise<Task[]> {
    return this.tasks.filter(item => item.user_id === user_id);
  }

  async findByIdAndUserId(
    task_id: number,
    user_id: number
  ): Promise<Task | undefined> {
    return this.tasks.find(
      item => item.id === task_id && item.user_id === user_id
    );
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async create(dto: ICreateTaskDTO): Promise<Task> {
    const task = new Task();

    const id = this.tasks.length || 1;

    Object.assign(task, { id }, dto);

    task.createdAt = new Date();
    task.updatedAt = new Date();

    this.tasks.push(task);

    return task;
  }

  async save(task_id: number, dto: Partial<Task>): Promise<Task> {
    const findIndex = this.tasks.findIndex(item => item.id === task_id);

    this.tasks[findIndex] = Object.assign(
      new Task(),
      { id: this.tasks.length },
      dto
    );

    return this.tasks[findIndex];
  }

  async delete(task_id: number | undefined): Promise<boolean> {
    const findIndex = this.tasks.findIndex(item => item.id === task_id);

    this.tasks.splice(findIndex, 1);

    return true;
  }
}

export default FakeTasksRepository;
