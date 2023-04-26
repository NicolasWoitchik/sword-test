import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: '654987321',
      role_id: 1,
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.firstName).toBe('John');
    expect(profile.email).toBe('johndoe@email.com');
  });

  it('should not be able to show a profile of a non-existent user', async () => {
    await expect(
      showProfile.execute({
        user_id: 999,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
