import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import ShowTechTaskService from './ShowTechTask';

let fakeTasksRepository: FakeTasksRepository;
let showTechTaskService: ShowTechTaskService;

describe('ShowTechTaskService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    showTechTaskService = new ShowTechTaskService(fakeTasksRepository);
  });

  it('should be able to show a tech task', async () => {
    await fakeTasksRepository.create({
      name: 'Task example',
      user_id: 1,
      summary: 'Lorem Ipsum',
    });

    const result = await showTechTaskService.execute({
      task_id: 1,
      user_id: 1,
    });

    expect(result).not.toBeUndefined();
  });

  it('should not be able to show a another tech task', async () => {
    await fakeTasksRepository.create({
      name: 'Task example',
      user_id: 1,
      summary: 'Lorem Ipsum',
    });

    await expect(
      showTechTaskService.execute({
        task_id: 1,
        user_id: 2,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show a non-existent role', async () => {
    await expect(
      showTechTaskService.execute({
        task_id: 999,
        user_id: 1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
