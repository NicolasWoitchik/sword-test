import { injectable } from 'tsyringe';

import RolesEnum from '../enums/RolesEnum';

interface IRequest {
  role_id: number;
}

@injectable()
class VerifyRoleService {
  public execute({ role_id }: IRequest): RolesEnum {
    return role_id === RolesEnum.MANAGER
      ? RolesEnum.MANAGER
      : RolesEnum.TECHNICIAM;
  }
}

export default VerifyRoleService;
