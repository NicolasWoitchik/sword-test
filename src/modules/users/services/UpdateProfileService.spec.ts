import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should not be able to update a profile of a non-existent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 99999,
        firstName: 'Jane',
        lastName: 'Doe',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change the password', async () => {
    const user = await fakeUsersRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: '123456',
      role_id: 1,
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      firstName: 'Jane',
      lastName: 'Doe',
      old_password: '123456',
      password: '123654',
    });

    expect(updatedUser.password).toBe('123654');
  });

  it('should not be able to change the password without inform the old', async () => {
    const user = await fakeUsersRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: '123456',
      role_id: 1,
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        firstName: 'John',
        lastName: 'Doe',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the password when old password does no match', async () => {
    const user = await fakeUsersRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: '123456',
      role_id: 1,
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        firstName: 'John',
        lastName: 'Doe',
        old_password: '654987',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
