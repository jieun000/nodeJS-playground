import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser()); // 쿠키 파서 설정
  app.use(
    session({
      secret: 'very-important-secret', // 세션 암호화에 사용되는 키
      resave: false, // 세션을 항상 저장할지 여부
      // 세션이 저장되기 전에는 초기화되지 않은 세션을 미리 만들어 저장
      saveUninitialized: false,
      cookie: { maxAge: 360000 } // 쿠키 유효기간 1시간
    })
  );
  // passport 초기화 및 세션 저장소 초기화
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();

// nest new l_nest-auth
// cd l_nest-auth
// nest g module user
// nest g controller user --no-spec
// nest g service user --no-spec

// npm i sqlite3 typeorm @nestjs/typeorm
// npm i class-validator class-transformer

// nest g module auth
// nest g service auth --no-spec
// nest g controller auth --no-spec

// npm i bcrypt
// npm i -D @types/bcrypt

// npm i cookie-parser

// npm i @nestjs/passport passport passport-local express-session
// npm i -D @types/passport-local @types/express-session