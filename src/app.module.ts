import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';

@Module({
  imports: [],
  controllers: [AppController, FilesController],
  providers: [AppService, FilesService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
