import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClientOptions } from './user-svc.option';
import { UserService } from '@/microservices/users-svc/src/users/services/users.service';
import { PaginateQuery } from 'nestjs-paginate';
import { User } from '@/microservices/users-svc/src/users/entities/user.entity';
import { PaginationFormat } from '@/shared/common/interfaces/pagination-format.interface';

@Controller('users')
export class UserController implements OnModuleInit {
  constructor(
    private readonly logger: PinoLogger,
    @Inject(UsersServiceClientOptions) private readonly userClient: ClientGrpc,
  ) {
    logger.setContext(UserController.name);
  }

  private userService: UserService;

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>('UserService');
  }

  @Get()
  async getAll(query: PaginateQuery): Promise<PaginationFormat<User>> {
    this.logger.info('UserController#findAll.call', query);

    return this.userService.getAll(query);
  }
}
