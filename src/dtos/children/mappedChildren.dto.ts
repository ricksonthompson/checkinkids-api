import { Address } from "../../valueObjects/address.vo";

export class MappedChildrenDTO {
  id: string
  firstName: string
  lastName: string
  birthDate: string
  observations: any
  address?: Address
  createdAt: Date
}
