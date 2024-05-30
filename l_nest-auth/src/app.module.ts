import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // sqlite 설정 메서드
      type: 'sqlite', // DB 타입
      database: 'nest-auth-test.sqlite', // DB 파일명
      entities: [User], // 엔티티 리스트
      synchronize: true, // DB에 스키마를 동기화
      logging: true // SQL 실행 로그 확인
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
