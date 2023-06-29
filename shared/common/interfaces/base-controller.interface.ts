import { PaginateQuery } from 'nestjs-paginate';
import { IdRequestParamDto } from '../dto/id-request-param.dto';
import { AbstractDto } from '../dto/abstract.dto';
import { PaginationFormat } from './pagination-format.interface';
import { AbstractEntity } from '../abstract.entity';

export interface BaseControllerInterface {
  getPaginated(query: PaginateQuery): Promise<PaginationFormat<AbstractEntity>>;

  findOne(params: IdRequestParamDto): Promise<AbstractEntity | AbstractDto>;

  create(dto: any, image?: any): Promise<AbstractEntity | AbstractDto>;

  update(
    params: IdRequestParamDto,
    dto: any,
    ...files: any
  ): Promise<AbstractEntity | AbstractDto>;

  delete(params: IdRequestParamDto): Promise<AbstractEntity | AbstractDto>;
}
