import AppError from '@shared/errors/AppError';

import FakeRolesRepository from '@modules/roles/repositories/fakes/FakeRolesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

import AuthenticatedUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeRolesRepository: FakeRolesRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticatedUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRolesRepository = new FakeRolesRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeRolesRepository,
      fakeHashProvider
    );

    authenticateUser = new AuthenticatedUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: '654987321',
      role_id: 1,
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@email.com',
      password: '654987321',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with a non-existent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: '654987321',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: '654987321',
      role_id: 1,
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: '65498734123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
