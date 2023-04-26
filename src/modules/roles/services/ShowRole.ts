import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';
import Role from '../infra/typeorm/entities/Role';

interface IRequest {
  role_id: number;
}

@injectable()
class ShowRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository
  ) {}

  public async execute({ role_id }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new AppError('Role not found', 401);
    }

    return role;
  }
}

export default ShowRoleService;
