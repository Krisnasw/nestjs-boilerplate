import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { AbstractEntity } from '../abstract.entity';
import { FindQueryOption } from './find-query-option.interface';

export interface BaseRepositoryInterface {
  table: string;
  queryClass: any;

  getPagination(query: PaginateQuery): Promise<Paginated<AbstractEntity | any>>;

  findEntity(
    id: string,
    option: FindQueryOption,
  ): Promise<AbstractEntity | any>;

  createEntity(dto: any): Promise<any>;

  updateEntity(criteria: any, dto: any): Promise<AbstractEntity>;

  deleteEntity(id: string): Promise<AbstractEntity | any>;
}
