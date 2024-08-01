import { Controller, Get } from '@nestjs/common';

interface Version {
  version: string;
}
@Controller('version')
export class VersionController {
  @Get()
  getVersion(): Version {
    return { version: '0.1.0' };
  }
}
