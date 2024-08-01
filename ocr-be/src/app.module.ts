import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VersionController } from './version/version.controller';

@Module({
  imports: [],
  controllers: [AppController, VersionController],
  providers: [AppService],
})
export class AppModule {}
