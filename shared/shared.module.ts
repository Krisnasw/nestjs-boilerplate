import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './services/config.service';

const providers = [ConfigService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
