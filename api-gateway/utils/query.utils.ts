import { RequestQuery } from '@/shared/common/interfaces/request-response.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryUtils {
  async getQueryParams(query: RequestQuery): Promise<any> {
    const select = await this.getAttributes(query.select);
    const orderBy = await this.getOrder(query.orderBy);
    const page = await this.getPage(query.page);
    const limit = await this.getLimit(query.limit);
    const offset = await this.getOffset(page, limit);

    return { select, orderBy, page, limit, offset };
  }

  private async getAttributes(attributes: string): Promise<string[]> {
    return attributes?.split(',') || undefined;
  }

  private async getPage(page: any): Promise<number> {
    const parsedPage = parseInt(page, 10);

    return isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  }

  private async getLimit(limit: any): Promise<number> {
    const parsedLimit = parseInt(limit, 10);

    return isNaN(parsedLimit) || parsedLimit < 1 ? 25 : parsedLimit;
  }

  private async getOffset(page: any, limit: any): Promise<number> {
    const tmpPage = await this.getPage(page);
    const tmpLimit = await this.getLimit(limit);

    return (tmpPage - 1) * tmpLimit;
  }

  private async getOrder(orderBy: string): Promise<[string, 'ASC' | 'DESC'][]> {
    if (!orderBy) {
      return [];
    }

    return orderBy
      .split(',')
      .map((attribute) => attribute.trim())
      .map((attribute) => {
        const order = attribute.startsWith('-') ? 'DESC' : 'ASC';
        const name = attribute.replace('-', '');

        return [name, order] as [string, 'ASC' | 'DESC'];
      });
  }
}
