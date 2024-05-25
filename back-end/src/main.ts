import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: CorsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-type, Autorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(options);

  await app.listen(3000);
}
bootstrap();
