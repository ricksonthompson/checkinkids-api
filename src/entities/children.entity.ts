import { Address } from '../valueObjects/address.vo';
import { v4 as uuid } from 'uuid';
import { ResponsiblesPropsDTO } from '../dtos/children/responsiblesProps.dto';

export class Children {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  observations: string;
  address?: Address;
  responsiblesProps?: Array<ResponsiblesPropsDTO>;
  responsibles?: any;
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    props: Omit<
      Children,
      'id' | 'createdAt' | 'address' | 'responsiblesProps' | 'responsibles'
    >,
    responsiblesProps: Array<ResponsiblesPropsDTO>,
    address: Address,
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? uuid();
    this.address = address;
    this.responsiblesProps = responsiblesProps;
  }
}
