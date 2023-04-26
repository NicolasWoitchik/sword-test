import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import ShowRoleService from './ShowRole';

let fakeUsersRepository: FakeRolesRepository;
let showRole: ShowRoleService;

describe('ShowRole', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeRolesRepository();

    showRole = new ShowRoleService(fakeUsersRepository);
  });

  it('should be able to show a role', async () => {
    const result = await showRole.execute({ role_id: 1 });

    expect(result).not.toBeUndefined();
  });

  it('should not be able to show a non-existent role', async () => {
    await expect(
      showRole.execute({
        role_id: 999,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
