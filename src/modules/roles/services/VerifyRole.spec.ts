import 'reflect-metadata';
import VerifyRoleService from './VerifyRole';
import RolesEnum from '../enums/RolesEnum';

let verifyRoleService: VerifyRoleService;

describe('ShowRole', () => {
  beforeEach(() => {
    verifyRoleService = new VerifyRoleService();
  });

  it('should be able to return menager by id', async () => {
    const result = await verifyRoleService.execute({ role_id: 1 });

    expect(result).toBe(RolesEnum.MANAGER);
  });
  it('should be able to return technician by id', async () => {
    const result = await verifyRoleService.execute({ role_id: 2 });

    expect(result).toBe(RolesEnum.TECHNICIAM);
  });
});
