import 'reflect-metadata';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import ListManagerTasksService from './ListManagerTasks';

let fakeTasksRepository: FakeTasksRepository;
let listManagerTasksService: ListManagerTasksService;

describe('ListManagerTasksService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    listManagerTasksService = new ListManagerTasksService(fakeTasksRepository);
  });

  it('should be able to list all user task', async () => {
    await fakeTasksRepository.create({
      name: 'Task example',
      user_id: 1,
      summary: 'Lorem Ipsum',
    });
    await fakeTasksRepository.create({
      name: 'Task example 2',
      user_id: 1,
      summary: 'Lorem Ipsum',
    });

    const result = await listManagerTasksService.execute();

    expect(result).not.toBeUndefined();
    expect(result.length).toBe(2);
  });

  it('should be able to show a all tech tasks', async () => {
    await fakeTasksRepository.create({
      name: 'Task example',
      user_id: 1,
      summary: 'Lorem Ipsum',
    });

    await fakeTasksRepository.create({
      name: 'Task example 2',
      user_id: 2,
      summary: 'Lorem Ipsum',
    });

    const result = await listManagerTasksService.execute();

    expect(result).not.toBeUndefined();
    expect(result.length).toBe(2);
  });

  // it('should not be able to show a non-existent role', async () => {
  //   await expect(
  //     listTask.execute({
  //       task_id: 999,
  //     })
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
