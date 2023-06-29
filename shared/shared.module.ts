import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { TranslationService } from './services/translation.service';

const providers = [ConfigService, TranslationService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
