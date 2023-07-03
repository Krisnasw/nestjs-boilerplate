import { NestFactory, Reflector } from '@nestjs/core';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ContextRequestInterceptor } from '@/shared/interceptors/context-request.interceptor';
import { SharedModule } from '@/shared/shared.module';
import {
  NestInterceptor,
  ClassSerializerInterceptor,
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@/shared/services/config.service';
import { NewrelicInterceptor } from '@/shared/interceptors/newrelic.interceptor';
import { i18nValidationErrorFactory } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  const configService = app.select(SharedModule).get(ConfigService);
  const reflector = app.get(Reflector);
  let globalInterceptors: NestInterceptor[] = [
    new ContextRequestInterceptor(configService),
    new ClassSerializerInterceptor(reflector),
  ];

  // NEWRELIC
  if (configService.newrelic.enabled) {
    globalInterceptors = [
      ...globalInterceptors,
      new NewrelicInterceptor(configService),
    ];
  }

  if (configService.rateLimit.enabled) {
    console.log('RATE_LIMIT', configService.rateLimit.enabled);
    app.use(
      rateLimit({
        windowMs: configService.rateLimit.windowMs,
        max: configService.rateLimit.max, // limit each IP to 100 requests per windowMs
      }),
    );
  }

  app.use(helmet());
  app.useGlobalInterceptors(...globalInterceptors);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: i18nValidationErrorFactory,
      validationError: {
        target: false,
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: configService.app.versionKey,
    defaultVersion: configService.app.versionDefault || VERSION_NEUTRAL,
  });

  const port = configService.getNumber('PORT') || 3000;
  const host = configService.get('HOST') || '127.0.0.1';
  if (configService.app.cors) {
    app.enableCors();
  }

  await app.listen(port, host);
}

bootstrap();
