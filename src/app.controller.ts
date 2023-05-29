import { Controller, Get, Post, Res, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { respond } from './auth/Responsehandler/ResponseHandler';

@Controller('/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  getPing(@Response() res) {
    const data = this.appService.getPing();
    respond(res, true, data);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  async uploadFile(@UploadedFile() file: any, @Response() res) {
    const data = await this.appService.uploadFile(file);
    respond(res, true, data);
  }
}
