import { AbstractEntity } from '../../../shared/common/abstract.entity';
import { PaginationFormat } from '../../../shared/common/interfaces/pagination-format.interface';
import { Paginated } from 'nestjs-paginate';

export async function formatPagination<T extends AbstractEntity>(
  data: Paginated<T>,
  toDto = true,
): Promise<PaginationFormat<T>> {
  return {
    data: toDto ? data.data.toDtos() : data.data,
    totalItems: data.meta.totalItems,
    totalPages: data.meta.totalPages,
    currentPage: data.meta.currentPage,
  };
}
