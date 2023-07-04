import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { UtilsModule } from '../utils/utils.module';
import { UserController } from './user.controller';
import { UserService } from '../../microservices/users-svc/src/users/services/users.service';
import { UserRepository } from '../../microservices/users-svc/src/users/repository/user.repository';

@Module({
  imports: [
    UtilsModule,
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserGatewayModule {}
