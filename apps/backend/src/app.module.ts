import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StateGateway } from './state.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StateGateway],
})
export class AppModule {}
