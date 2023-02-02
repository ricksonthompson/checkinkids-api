import { HttpException, HttpStatus } from '@nestjs/common';
import { ERoles } from './ETypes';

export const setPermissions = (roles: ERoles) => {
  if (!roles)
    throw new HttpException(
      'Sem permissão para acessar este recurso!',
      HttpStatus.METHOD_NOT_ALLOWED,
    );

  if (roles === ERoles.ROLE_LEADER)
    return [
      'LEADER',
      'create-children',
      'edit-children',
      'delete-children',
      'list-children',
      'list-user',
      'create-user',
      'edit-user',
      'delete-user',
      'list-cult',
      'create-cult',
      'edit-cult',
      'delete-cult',
    ];

  if (roles === ERoles.ROLE_MEMBER)
    return [
      'MEMBER',
      'create-children',
      'edit-children',
      'delete-children',
      'list-children',
      'list-cult',
      'edit-cult',
    ];
};
