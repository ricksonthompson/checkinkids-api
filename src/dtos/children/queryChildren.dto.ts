export interface IQueryChildren {
  birthDate?: Date;
  name?: {
    contains: string;
  };
  observations?: {
    contains: string;
  };
  responsibles?: {
    every: {
      name: {
        contains: string;
      };
    };
  };
}
