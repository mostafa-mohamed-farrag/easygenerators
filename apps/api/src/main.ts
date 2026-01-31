import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  const config = app.get(ConfigService);

  const origins = config
    .get<string>('CORS_ORIGINS')
    ?.split(',')
    .map((o) => o.trim());

  app.enableCors({
    origin: origins,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
