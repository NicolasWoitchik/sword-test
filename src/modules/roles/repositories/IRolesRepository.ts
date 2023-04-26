import Role from '../infra/typeorm/entities/Role';

export default interface IRolesRepository {
  findById(role_id: number): Promise<Role | undefined>;
}
