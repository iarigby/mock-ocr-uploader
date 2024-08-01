import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { isImageError, OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private ocrService: OcrService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async scanImage(@UploadedFile() file: Express.Multer.File) {
    return this.ocrService
      .imageToText(file)
      .then((res) => ({ ocrResult: res }))
      .catch((err) => {
        if (isImageError(err)) {
          throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        throw new HttpException(
          'Unknown Error During Image Analysis',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
