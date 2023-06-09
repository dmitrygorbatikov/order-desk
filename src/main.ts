import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.enableCors();

  await app.listen(port, () =>
    console.log(`App has been started on PORT ${port}`),
  );
}
bootstrap();
