import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  formatFile(file: File): File {
    return file;
  }
}
