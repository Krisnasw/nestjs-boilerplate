import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { UtilsModule } from '../utils/utils.module';
import { UserController } from './user.controller';

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
})
export class UserGatewayModule {}
