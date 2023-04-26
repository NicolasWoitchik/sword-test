import AppError from '@shared/errors/AppError';

import FakeRolesRepository from '@modules/roles/repositories/fakes/FakeRolesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeRolesRepository: FakeRolesRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRolesRepository = new FakeRolesRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeRolesRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: '654987321',
      role_id: 1,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email', async () => {
    await createUser.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: '654987321',
      role_id: 1,
    });

    await expect(
      createUser.execute({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: '654987321',
        role_id: 1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with non-existing role', async () => {
    await expect(
      createUser.execute({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: '654987321',
        role_id: 3,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
