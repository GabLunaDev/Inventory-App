export class QueryProductDto {
  code?: number;

  name?: string;

  createdAt?: Date;

  sortOrder?: 'asc' | 'desc';
}
