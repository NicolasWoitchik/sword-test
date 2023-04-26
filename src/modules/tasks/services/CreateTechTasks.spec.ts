import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import CreateTechTasksService from './CreateTechTasks';

let fakeTasksRepository: FakeTasksRepository;
let createTechTaskService: CreateTechTasksService;

describe('CreateTechTasksService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    createTechTaskService = new CreateTechTasksService(fakeTasksRepository);
  });

  it('should be able to create tech task', async () => {
    const result = await createTechTaskService.execute({
      name: 'Task Name',
      summary: 'big sumary',
      user_id: 1,
    });

    expect(result).not.toBeUndefined();
    expect(result.name).toBe('Task Name');
    expect(result.summary).toBe('big sumary');
    expect(result.createdAt).not.toBeUndefined();
    expect(result.updatedAt).not.toBeUndefined();
    expect(result.performedAt).toBeUndefined();
  });

  it('should not be able to create tech task without name', async () => {
    await expect(
      createTechTaskService.execute({
        name: (undefined as unknown) as string,
        summary: 'big sumary',
        user_id: 1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create tech task without summary', async () => {
    await expect(
      createTechTaskService.execute({
        name: 'Task Name',
        summary: (undefined as unknown) as string,
        user_id: 1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to show a non-existent role', async () => {
  //   await expect(
  //     listTask.execute({
  //       task_id: 999,
  //     })
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
