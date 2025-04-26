import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.PRODUCT_SERVICE_PORT,
    },
  });
  await app.listen();
}
bootstrap();
