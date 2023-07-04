import { AbstractRepository } from '../../../../../shared/common/repositories/abstract.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DataSource, QueryRunner } from 'typeorm';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { UserQuery } from '../queries/user.query';
import { BaseRepositoryInterface } from '../../../../../shared/common/interfaces/base-repository.interface';
import { AbstractEntity } from '../../../../../shared/common/abstract.entity';
import {
  DefaultFindQueryOption,
  FindQueryOption,
} from '../../../../../shared/common/interfaces/find-query-option.interface';

@Injectable()
export class UserRepository
  extends AbstractRepository<User>
  implements BaseRepositoryInterface
{
  table = 'users';
  queryClass = UserQuery;

  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
    this.dataSource = dataSource;
  }

  getPagination = async (query: PaginateQuery): Promise<Paginated<User>> => {
    const paginateQuery = new UserQuery(this.createQueryBuilder(this.table))
      .addOrderBy('name', 'ASC')
      .setFindOptions({ skip: query.page * query.limit, take: query.limit });
    return paginate<User>(query, paginateQuery, {
      relations: [],
      sortableColumns: ['name', 'email'],
      searchableColumns: ['name', 'email'],
      defaultSortBy: [['name', 'ASC']],
      filterableColumns: {
        name: [FilterOperator.EQ],
        email: [FilterOperator.EQ],
      },
    });
  };

  findEntity = async (
    id: string,
    option: FindQueryOption = DefaultFindQueryOption,
  ): Promise<User> => {
    const query = new UserQuery(this.createQueryBuilder(this.table)).whereId(
      id,
    );
    return await query.getOneOrFail();
  };

  createEntity(dto: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  updateEntity(criteria: any, dto: any): Promise<AbstractEntity> {
    throw new Error('Method not implemented.');
  }

  deleteEntity = async (id: string): Promise<User> => {
    return await this.safeTransaction(async (queryRunner: QueryRunner) => {
      await queryRunner.manager.delete(User, id);
    });
  };
}
