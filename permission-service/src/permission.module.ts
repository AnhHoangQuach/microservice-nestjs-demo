import { Module } from '@nestjs/common';
import { ConfirmedStrategyService } from './confirmed-strategy.service';
import { ConfigModule } from '@nestjs/config';
import { PermissionController } from './permission.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
  ],
  controllers: [PermissionController],
  providers: [ConfirmedStrategyService],
})
export class PermissionModule {}
