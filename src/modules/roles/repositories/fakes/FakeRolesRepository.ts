import Role from '@modules/roles/infra/typeorm/entities/Role';
import RolesEnum from '@modules/roles/enums/RolesEnum';
import IRolesRepository from '../IRolesRepository';

class FakeRolesRepository implements IRolesRepository {
  private roles: Role[] = [
    {
      id: RolesEnum.MANAGER,
      name: 'MANAGER',
    },
    {
      id: RolesEnum.TECHNICIAM,
      name: 'TECHNICIAM',
    },
  ];

  async findById(role_id: number): Promise<Role | undefined> {
    return this.roles.find(item => item.id === role_id);
  }
}

export default FakeRolesRepository;
