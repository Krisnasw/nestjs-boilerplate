import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import paginateQueryResolverUtils from '../../utils/paginate-query-resolver.utils';

export const Paginate = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { query } = ctx.switchToHttp().getRequest();
    return paginateQueryResolverUtils(query);
  },
);
