import { NestFactory } from '@nestjs/core';
import { PermissionModule } from './permission.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PermissionModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.PERMISSION_SERVICE_PORT,
    },
  });
  await app.listen();
}
bootstrap();
