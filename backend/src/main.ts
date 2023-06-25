import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'User-Agent',
      'Enctype',
      'Cache-Control',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(4000);
}
void bootstrap();
