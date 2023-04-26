import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/hashProvider/models/IHasProvider';

interface IRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_id: number;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RolesRepository')
    private roleRepository: IRolesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    firstName,
    lastName,
    email,
    password,
    role_id,
  }: IRequest): Promise<User> {
    const exists = await this.usersRepository.findByEmail(email);

    if (exists) throw new AppError('Already exists an user with this email');

    const roleExists = await this.roleRepository.findById(role_id);

    if (!roleExists) throw new AppError('Role does not exist', 401);

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role_id,
    });

    return user;
  }
}

export default CreateUserService;
