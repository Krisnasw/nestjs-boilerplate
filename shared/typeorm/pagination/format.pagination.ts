import { Paginated } from 'nestjs-paginate';
import { AbstractEntity } from '../../common/abstract.entity';
import { PaginationFormat } from '../../common/interfaces/pagination-format.interface';

export async function formatPagination<T extends AbstractEntity>(
  data: Paginated<T>,
  toDto = true,
): Promise<PaginationFormat<T>> {
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data: toDto ? data.data.toDtos() : data.data,
    totalItems: data.meta.totalItems,
    totalPages: data.meta.totalPages,
    currentPage: data.meta.currentPage,
  };
}
