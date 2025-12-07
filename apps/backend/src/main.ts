import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = parseInt(configService.get<string>('PORT', '5000'));
  const wsPort = parseInt(configService.get<string>('WS_PORT', '5080'));
  const corsOrigin = configService.get<string>('CORS_ORIGIN', '*');

  app.enableCors({ origin: corsOrigin });

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`🔌 WebSocket running on port ${wsPort}`);

  await app.listen(port);
}
bootstrap();
