import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 5000);
  const wsPort = configService.get<number>('WS_PORT', 5080);
  const corsOrigin = configService.get<string>('CORS_ORIGIN', '*');

  app.enableCors({ origin: corsOrigin });

  await app.listen(port);
}
bootstrap();
