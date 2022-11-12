import { FiltersChildrenDTO } from "../../dtos/children/filtersChildren.dto";
import { IQueryChildren } from "../../dtos/children/queryChildren.dto";

export function generateQueryByFiltersForChildrens(filters: FiltersChildrenDTO): IQueryChildren {

  const fields = {
    firstName: () => ({
      firstName: filters.firstName
    }),
    lastName: () => ({
      lastName: filters.lastName
    }),
    birthDate: () => ({
      birthDate: filters.birthDate
    })
  }

  const keysFields = Object.keys(fields);

  let query: IQueryChildren;

  let queryBuilder: Function;

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
