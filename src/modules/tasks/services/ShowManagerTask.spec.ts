import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import ShowManagerTaskService from './ShowManagerTask';

let fakeTasksRepository: FakeTasksRepository;
let showTechTaskService: ShowManagerTaskService;

describe('ShowManagerTaskService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    showTechTaskService = new ShowManagerTaskService(fakeTasksRepository);
  });

  it('should be able to show a tech task', async () => {
    await fakeTasksRepository.create({
      name: 'Task example',
      user_id: 1,
      summary: 'Lorem Ipsum',
    });

    const result = await showTechTaskService.execute({
      task_id: 1,
    });

    expect(result).not.toBeUndefined();
  });

  it('should not be able to show a non-existent task', async () => {
    await expect(
      showTechTaskService.execute({
        task_id: 999,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
