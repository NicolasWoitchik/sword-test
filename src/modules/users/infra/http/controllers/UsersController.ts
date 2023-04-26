import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import CreateUserService from '../../../services/CreateUserService';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { firstName, lastName, email, role_id, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      firstName,
      lastName,
      email,
      password,
      role_id,
    });
    return res.json(classToClass(user));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({
      user_id,
    });

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { firstName, lastName, old_password, password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      firstName,
      lastName,
      old_password,
      password,
    });

    return res.json(classToClass(user));
  }
}

export default UsersController;
