import { container } from 'tsyringe';

import '@modules/users/providers';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import RolesRepository from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepository';

export default function execute(): void {
  container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
  );

  container.registerSingleton<IRolesRepository>(
    'RolesRepository',
    RolesRepository
  );

  container.registerSingleton<ITasksRepository>(
    'TasksRepository',
    TasksRepository
  );
}
