import { Injectable } from '@nestjs/common';
import { uid } from 'uid';

@Injectable()
export class OcrService {
  async imageToText(file: Express.Multer.File): Promise<string> {
    switch (weightedRandom(1, 5)) {
      case 1:
        return uid(21);
      case 2:
        throw new ImageError('Unsupported File Type: ' + file.mimetype);
      case 3:
        throw new ImageError('Image Too Large');
      case 4:
        throw new ImageError('Could Not Detect Text On Image');
      case 5:
        throw new ImageError(
          'Text on image is too blurry. Try taking a different image',
        );
    }
  }
}

// https://stackoverflow.com/a/46774731
function weightedRandom(min: number, max: number) {
  return Math.round(max / (Math.random() * max + min));
}

class ImageError extends Error {
  type = 'image-error';
  constructor(message: string) {
    super(message);
  }
}

export function isImageError(error: Error): error is ImageError {
  return 'type' in error && error.type === 'image-error';
}
