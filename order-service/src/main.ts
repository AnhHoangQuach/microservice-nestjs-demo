import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { OrderModule } from './order.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.ORDER_SERVICE_PORT,
    },
  });
  await app.listen();
}
bootstrap();
