import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { UserGatewayModule } from './users/user.module';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../shared/services/config.service';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { AbstractRequestContext } from '../shared/common/contexts/AbstractRequestContext';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import '../shared/boilerplate.polyfill';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    RequestContextModule.forRoot({
      contextClass: AbstractRequestContext,
      isGlobal: true,
    }),
    TerminusModule,
    UserGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
