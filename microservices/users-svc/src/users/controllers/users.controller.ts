import { PaginateQuery } from 'nestjs-paginate';
import { TransformResponseInterceptor } from '@/shared/interceptors/response.interceptor';
import { Controller, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from '../entities/user.entity';
import { PaginationFormat } from '@/shared/common/interfaces/pagination-format.interface';

@Controller('users')
@UseInterceptors(TransformResponseInterceptor)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @GrpcMethod('UsersService', 'getAll')
  async getAll(
    @Query() queryParams: PaginateQuery,
  ): Promise<PaginationFormat<User>> {
    return await this._userService.getAll(queryParams);
  }
}
