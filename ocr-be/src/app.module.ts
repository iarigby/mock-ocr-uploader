import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VersionController } from './version/version.controller';
import { OcrController } from './ocr/ocr.controller';
import { OcrService } from './ocr/ocr.service';

@Module({
  imports: [],
  controllers: [AppController, VersionController, OcrController],
  providers: [AppService, OcrService],
})
export class AppModule {}
