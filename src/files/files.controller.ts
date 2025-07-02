import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Get()
  findAll(): string {
    return 'all good here';
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  convertFile(@UploadedFile() file: Express.Multer.File): Express.Multer.File {
    return this.filesService.formatFile(file);
  }
}
