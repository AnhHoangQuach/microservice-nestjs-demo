import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { MongoConfigService } from './configs/mongo-config.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './schemas/order.schema';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

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
  providers: [
    OrderService,
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.PRODUCT_SERVICE_HOST,
            port: parseInt(process.env.PRODUCT_SERVICE_PORT),
          },
        });
      },
    },
  ],
})
export class OrderModule {}
