import { NestFactory } from '@nestjs/core';
import { PermissionModule } from './permission.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PermissionModule, {
    transport: Transport.TCP,
  });
  await app.listen();
}
bootstrap();
