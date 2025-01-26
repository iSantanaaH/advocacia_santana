import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';
import path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: CorsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-type, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(options);

  config();

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();
