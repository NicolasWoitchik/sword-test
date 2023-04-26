import 'reflect-metadata';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import ListTechTasksService from './ListTechTasks';

let fakeTasksRepository: FakeTasksRepository;
let listTechTasksService: ListTechTasksService;

describe('ListTechTasksService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    listTechTasksService = new ListTechTasksService(fakeTasksRepository);
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

    const result = await listTechTasksService.execute({
      user_id: 1,
    });

    expect(result).not.toBeUndefined();
    expect(result.length).toBe(2);
  });

  it('should not be able to show a another user task', async () => {
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

    const result = await listTechTasksService.execute({
      user_id: 2,
    });

    expect(result).not.toBeUndefined();
    expect(result.length).toBe(0);
  });

  // it('should not be able to show a non-existent role', async () => {
  //   await expect(
  //     listTask.execute({
  //       task_id: 999,
  //     })
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
