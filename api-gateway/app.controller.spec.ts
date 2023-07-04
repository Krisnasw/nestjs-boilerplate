import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { AbstractRequestContext } from '../shared/common/contexts/AbstractRequestContext';
import { SharedModule } from '../shared/shared.module';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { UserGatewayModule } from './users/user.module';
import { ConfigService } from '../shared/services/config.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [SharedModule],
          useFactory: (configService: ConfigService) =>
            configService.typeOrmConfig,
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
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
