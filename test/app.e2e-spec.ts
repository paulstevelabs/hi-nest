import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
      forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
      transform: true, // url에 요청받는 값은 string인데 자동으로 number로 바꿔줌
    })); // 유효성 검사 파이프 - 미들웨어 같은 것
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my movie API');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([]);
    });
    it("POST", () => {
      return request(app.getHttpServer())
        .post('/movies')
        .expect(201)
        .send({
          title: 'test',
          year: 2020,
          genres: ['test'],
        });
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404);
    });
  });

  describe('/movies/:id', () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });
    it("GET 404", () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });
    it("PATCH 200", () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'patch test'
        })
        .expect(200)
    });
    it("POST 400", () => {
      return request(app.getHttpServer())
        .post('/movies')
        .expect(400)
        .send({
          title: 'test',
          year: 2020,
          genres: ['test'],
          other: "tset"
        });
    });
    it("DELETE 200", () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    });
  })
});
