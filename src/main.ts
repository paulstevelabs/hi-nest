import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
    forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
    transform: true, // url에 요청받는 값은 string인데 자동으로 number로 바꿔줌
  })); // 유효성 검사 파이프 - 미들웨어 같은 것
  await app.listen(3000);
}
bootstrap();
