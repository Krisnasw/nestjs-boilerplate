import { PaginateQuery } from 'nestjs-paginate';
import { AbstractDto } from '../dto/abstract.dto';
import { FindQueryOption } from './find-query-option.interface';
import { PaginationFormat } from './pagination-format.interface';
import { AbstractEntity } from '../abstract.entity';
export interface BaseServiceInterface {
  getAll(query: PaginateQuery): Promise<PaginationFormat<AbstractEntity>>;

  findOneById(
    id: string,
    option: FindQueryOption,
  ): Promise<AbstractEntity | AbstractDto>;

  create(dto: any, image?: any): Promise<AbstractEntity>;

  update(id: string, dto: any, image?: any): Promise<AbstractEntity>;

  delete(id: string): Promise<AbstractEntity | AbstractDto>;
}
