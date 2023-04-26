import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeTransporterProvider from '@shared/container/providers/TransporterProvider/fakes/FakeTransporterProvider';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import UpdateTechTasksService from './UpdateTechTasks';

jest.mock(
  '@shared/container/providers/TransporterProvider/fakes/FakeTransporterProvider'
);
let fakeTasksRepository: FakeTasksRepository;
let fakeTransporterProvider: FakeTransporterProvider;
let updateTechTaskService: UpdateTechTasksService;

describe('updateTechTasksService', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeTransporterProvider = new FakeTransporterProvider();

    updateTechTaskService = new UpdateTechTasksService(
      fakeTasksRepository,
      fakeTransporterProvider
    );
  });

  it('should be able to update tech task', async () => {
    const created = await fakeTasksRepository.create({
      name: 'Task Name',
      summary: 'big sumary',
      user_id: 1,
    });

    const task = await updateTechTaskService.execute({
      name: 'New Task Name',
      summary: 'other summary',
      user_id: 1,
      task_id: created.id,
    });

    expect(task.name).toBe('New Task Name');
    expect(task.summary).toBe('other summary');
  });

  it('should be able to finish task', async () => {
    const created = await fakeTasksRepository.create({
      name: 'Task Name',
      summary: 'big sumary',
      user_id: 1,
    });

    const task = await updateTechTaskService.execute({
      name: 'New Task Name',
      summary: 'other summary',
      user_id: 1,
      task_id: created.id,
      finished: true,
    });

    expect(task.name).toBe('New Task Name');
    expect(task.summary).toBe('other summary');
    expect(task.performedAt).not.toBeUndefined();
  });

  it('should be able to update tech task', async () => {
    const created = await fakeTasksRepository.create({
      name: 'Task Name',
      summary: 'big sumary',
      user_id: 1,
    });

    const task = await updateTechTaskService.execute({
      name: 'New Task Name',
      summary: 'other summary',
      user_id: 1,
      task_id: created.id,
    });

    expect(task.name).toBe('New Task Name');
    expect(task.summary).toBe('other summary');
  });
  it('should not be able to update finished task', async () => {
    const created = await fakeTasksRepository.create({
      name: 'Task Name',
      summary: 'big sumary',
      user_id: 1,
    });

    await fakeTasksRepository.save(created.id, {
      ...created,
      performedAt: new Date(),
    });

    await expect(
      updateTechTaskService.execute({
        name: 'New Task Name',
        summary: 'other summary',
        user_id: 1,
        task_id: created.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update someone else's task", async () => {
    const created = await fakeTasksRepository.create({
      name: 'Task Name',
      summary: 'big sumary',
      user_id: 1,
    });

    await expect(
      updateTechTaskService.execute({
        name: undefined as unknown as string,
        summary: 'big sumary',
        user_id: 2,
        task_id: created.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update non-existing task', async () => {
    await expect(
      updateTechTaskService.execute({
        name: 'Task Name',
        summary: undefined as unknown as string,
        user_id: 1,
        task_id: 999,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
