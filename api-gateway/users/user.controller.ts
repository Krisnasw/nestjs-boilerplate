import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  OnModuleInit,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClientOptions } from './user-svc.option';
import { UserService } from '../../microservices/users-svc/src/users/services/users.service';
import { PaginateQuery } from 'nestjs-paginate';
import { User } from '../../microservices/users-svc/src/users/entities/user.entity';
import { PaginationFormat } from '../../shared/common/interfaces/pagination-format.interface';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from '../../shared/common/dto/pagination.dto';
import { ApiCustomHeader } from '../../shared/swagger/decorator';
import { TransformResponseInterceptor } from '../../shared/interceptors/response.interceptor';

@ApiTags('Users')
@ApiCustomHeader()
@Controller('users')
@UseInterceptors(TransformResponseInterceptor)
export class UserController implements OnModuleInit {
  constructor(
    @Inject(UsersServiceClientOptions) private readonly userClient: ClientGrpc,
  ) {}

  private userService: UserService;

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>('UserService');
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully Populate Data',
  })
  @ApiQuery({ type: Pagination })
  @Get()
  async getAll(query: PaginateQuery): Promise<PaginationFormat<User>> {
    return this.userService.getAll(query);
  }
}
