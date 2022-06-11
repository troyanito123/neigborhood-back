import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { ConfigOptions } from 'src/config/config';
import { Role } from 'src/modules/roles/roles.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { RoleOptions } from 'src/modules/auth/roles.decorator';

import { hashSync } from 'bcrypt';

const setDefaultData = async (configService: ConfigService) => {
  const roleRepository = getRepository<Role>(Role);
  const userRepository = getRepository<User>(User);

  let roleAdmin = await roleRepository
    .createQueryBuilder()
    .where('code = :code', {
      code: RoleOptions.ADMIN,
    })
    .getOne();

  if (!roleAdmin) {
    const newAdminRole = roleRepository.create({
      displayName: 'Administrador',
      code: RoleOptions.ADMIN,
    });
    roleAdmin = await roleRepository.save(newAdminRole);
  }

  const roleUser = await roleRepository
    .createQueryBuilder()
    .where('code = :code', {
      code: RoleOptions.USER,
    })
    .getOne();

  if (!roleUser) {
    const newRoleUser = roleRepository.create({
      displayName: 'Usuario',
      code: RoleOptions.USER,
    });
    await roleRepository.save(newRoleUser);
  }

  const supervisorRole = await roleRepository
    .createQueryBuilder()
    .where('code = :code', {
      code: RoleOptions.SUPERVISOR,
    })
    .getOne();

  if (!supervisorRole) {
    const newSupervisorRole = roleRepository.create({
      displayName: 'Supervisor',
      code: RoleOptions.SUPERVISOR,
    });
    await roleRepository.save(newSupervisorRole);
  }

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('email = :email', {
      email: configService.get(ConfigOptions.defaultUserEmail),
    })
    .getOne();

  if (!defaultUser) {
    const newUser = userRepository.create({
      email: configService.get(ConfigOptions.defaultUserEmail),
      password: hashSync(
        configService.get(ConfigOptions.defaultUserPassword),
        10,
      ),
      displayName: ConfigOptions.defaultUserName,
      role: roleAdmin,
    });
    await userRepository.save(newUser);
  }
};

export default setDefaultData;
