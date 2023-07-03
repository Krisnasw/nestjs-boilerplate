import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClientOptions } from './user-svc.option';
import { UserService } from '@/microservices/users-svc/src/users/services/users.service';
import { PaginateQuery } from 'nestjs-paginate';
import { User } from '@/microservices/users-svc/src/users/entities/user.entity';
import { PaginationFormat } from '@/shared/common/interfaces/pagination-format.interface';

@Controller('users')
export class UserController implements OnModuleInit {
  constructor(
    @Inject(UsersServiceClientOptions) private readonly userClient: ClientGrpc,
  ) {}

  private userService: UserService;

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>('UserService');
  }

  @Get()
  async getAll(query: PaginateQuery): Promise<PaginationFormat<User>> {
    return this.userService.getAll(query);
  }
}
