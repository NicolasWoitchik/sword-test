import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import { Repository, getRepository } from 'typeorm';
import Role from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findById(id: number): Promise<Role | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }
}

export default RolesRepository;
