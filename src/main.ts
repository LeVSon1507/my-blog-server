import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) =>
        new HttpException(
          {
            message: errors.map((err) => err.constraints),
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );

  const PORT = 3333;
  await app.listen(PORT, () => {
    console.log(`App start with port ${PORT}`);
  });
}
bootstrap();
