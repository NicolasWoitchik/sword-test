import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import DeleteManagerTaskService from './DeleteManagerTask';

let fakeTasksRepository: FakeTasksRepository;
let deleteManagerTaskService: DeleteManagerTaskService;

describe('DeleteManagerTaskService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    deleteManagerTaskService = new DeleteManagerTaskService(
      fakeTasksRepository
    );
  });

  it('should be able to delete tech task', async () => {
    const created = await fakeTasksRepository.create({
      name: 'Task example',
      user_id: 1,
      summary: 'Lorem Ipsum',
    });

    const result = await deleteManagerTaskService.execute({
      task_id: created.id,
    });

    expect(result).toBeTruthy();
  });
  it('should not be able to delete non-exisitent tech task', async () => {
    await expect(
      deleteManagerTaskService.execute({
        task_id: 999,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
