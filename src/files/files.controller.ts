import { Controller, Get } from '@nestjs/common';

@Controller('files')
export class FilesController {
  @Get()
  findAll(): string {
    return 'This action returns all files';
  }
}
