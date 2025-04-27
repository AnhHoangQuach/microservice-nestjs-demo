import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { MongoConfigService } from './configs/mongo-config.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
