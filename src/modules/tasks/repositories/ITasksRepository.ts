import ICreateTaskDTO from '../dtos/CreateTaskDTO';
import Task from '../infra/typeorm/entities/Task';

export default interface ITasksRepository {
  findById(task_id: number): Promise<Task | undefined>;
  findByIdAndUserId(
    task_id: number,
    user_id: number
  ): Promise<Task | undefined>;
  findAll(): Promise<Task[]>;
  findAllByUserId(user_id: number): Promise<Task[]>;
  create(dto: ICreateTaskDTO): Promise<Task>;
  save(task_id: number, dto: Partial<Task>): Promise<Task>;
  delete(task_id: number): Promise<boolean>;
}
