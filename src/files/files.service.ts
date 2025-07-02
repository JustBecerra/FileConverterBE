import { Injectable } from '@nestjs/common';
import { Calibre } from 'node-calibre';

@Injectable()
export class FilesService {
  private readonly calibre: Calibre;

  constructor() {
    this.calibre = new Calibre();
  }

  formatFile(file: Express.Multer.File): Express.Multer.File {
    return file;
  }
}
