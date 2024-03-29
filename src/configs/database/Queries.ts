import { FiltersUserDTO } from '../../dtos/user/filtersUser.dto';
import { IQueryUser } from '../../dtos/user/queryUser.dto';
import { FiltersChildrenDTO } from '../../dtos/children/filtersChildren.dto';
import { IQueryChildren } from '../../dtos/children/queryChildren.dto';

export function generateQueryForChildrens(
  filters: FiltersChildrenDTO,
): IQueryChildren {
  const fields = {
    name: () => ({
      name: {
        contains: filters.name,
      },
    }),
    birthDate: () => ({
      birthDate: filters.birthDate,
    }),
    observations: () => ({
      observations: {
        contains: filters.observations,
      },
    }),
    responsible: () => ({
      responsibles: {
        every: {
          name: {
            contains: filters.responsible,
          },
        },
      },
    }),
  };

  const keysFields = Object.keys(fields);

  let query: IQueryChildren;

  let queryBuilder: () => IQueryChildren;

  for (const filter in filters) {
    if (keysFields.includes(filter)) {
      queryBuilder = fields[filter];

      if (query) {
        const newCondition = queryBuilder();

        Object.assign(query, { ...newCondition });
      } else {
        query = queryBuilder();
      }
    }
  }

  return query;
}

export function generateQueryForUsers(filters: FiltersUserDTO): IQueryUser {
  const fields = {
    name: () => ({
      name: {
        contains: filters.name,
      },
    }),
    phone: () => ({
      phone: filters.phone,
    }),
    email: () => ({
      email: filters.email,
    }),
    type: () => ({
      types: filters.type,
    }),
  };

  const keysFields = Object.keys(fields);

  let query: IQueryChildren;

  let queryBuilder: () => IQueryChildren;

  for (const filter in filters) {
    if (keysFields.includes(filter)) {
      queryBuilder = fields[filter];

      if (query) {
        const newCondition = queryBuilder();

        Object.assign(query, { ...newCondition });
      } else {
        query = queryBuilder();
      }
    }
  }

  return query;
}
