import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { UserController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
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
  providers: [
    { provide: 'UserService', useClass: UserService },
    { provide: 'UserRepository', useValue: UserRepository },
  ],
})
export class UserModule {}
