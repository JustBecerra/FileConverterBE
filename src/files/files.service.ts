import { Injectable } from '@nestjs/common';
import { Calibre } from 'node-calibre';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

@Injectable()
export class FilesService {
  private readonly calibre: Calibre;

  constructor() {
    this.calibre = new Calibre();
  }

  async formatFile(file: Express.Multer.File): Promise<Express.Multer.File> {
    // Step 1: Create temporary directory for Calibre needs
    const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'calibre-'));

    // Step 2: Save uploaded file to temp directory
    const inputPath = path.join(tempDir, file.originalname); // creates a path to the file in the temp directory
    await fs.promises.writeFile(inputPath, file.buffer); // stores file content in inputPath

    // Step 3: change extension to .mobi
    const outputName = file.originalname.replace(/\.epub$/i, '.mobi');

    // Calibre creates file with .epub.mobi extension, so we need to adjust
    const actualOutputPath = path.join(tempDir, file.originalname + '.mobi');

    // Step 4: Convert using Calibre
    try {
      await this.calibre.ebookConvert(inputPath, 'mobi', {});

      // Step 5: Read converted file
      const convertedBuffer = await fs.promises.readFile(actualOutputPath);

      // Step 6: Create new file object
      const convertedFile: Express.Multer.File = {
        ...file,
        originalname: outputName,
        buffer: convertedBuffer,
        size: convertedBuffer.length
      };

      // Step 7: Clean up temporary directory
      await fs.promises.rm(tempDir, { recursive: true, force: true });

      return convertedFile;
    } catch (error) {
      console.error('Conversion error:', error);
      // Clean up temporary directory on error
      await fs.promises.rm(tempDir, { recursive: true, force: true });
      throw error;
    }
  }
}
