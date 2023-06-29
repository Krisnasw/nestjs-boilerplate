import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { AbstractEntity } from '@common/abstract.entity';
import { FindQueryOption } from '@common/interfaces/find-query-option';

export interface BaseRepositoryInterface {
    table: string;
    queryClass: any;

    getPagination(query: PaginateQuery): Promise<Paginated<AbstractEntity | any>>;

    findEntity(id: string, option: FindQueryOption): Promise<AbstractEntity>;

    createEntity(dto: any): Promise<any>;

    updateEntity(criteria: any, dto: any): Promise<AbstractEntity>;

    deleteEntity(id: string): Promise<any>;
}
