import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from './multer.options';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('file-upload')
  // // @UseInterceptors(FileInterceptor('file')) // 파일 인터셉터
  // @UseInterceptors(FileInterceptor('file', multerOption))
  // fileUpload(@UploadedFile() file: Express.Multer.File) { // 인터셉터에서 준 파일을 받음
  //   // console.log(file.buffer.toString('utf-8')); // 텍스트 파일 내용 출력
  //   console.log(file);
  //   return 'File Upload';
  // }
  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file', multerOption))
  fileUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // 업로드한 파일명과 경로 반환
    return `${file.originalname} File Uploaded check http://localhost:3000/uploads/${file.filename}`;
  }
}
