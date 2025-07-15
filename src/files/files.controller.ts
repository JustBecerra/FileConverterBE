import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
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
  async convertFile(@UploadedFile() file: Express.Multer.File, @Res() res) {
    // Validate that a file was uploaded
    if (!file) {
      throw new BadRequestException('No file uploaded. Please ensure you are sending a file with the field name "file"');
    }

    // Validate file type (optional - only if you want to restrict to EPUB)
    if (!file.originalname.toLowerCase().endsWith('.epub')) {
      throw new BadRequestException('Only EPUB files are supported for conversion');
    }

    const convertedFile = await this.filesService.formatFile(file);

    // Encode filename to handle special characters
    const encodedFilename = encodeURIComponent(convertedFile.originalname);

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodedFilename}"; filename*=UTF-8''${encodedFilename}`,
      'Content-Length': convertedFile.size,
    });

    res.send(convertedFile.buffer);
  }
}
