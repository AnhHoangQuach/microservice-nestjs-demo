import { NestFactory } from '@nestjs/core';
import { TaskModule } from './task.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TaskModule, {
    transport: Transport.TCP,
  });
  await app.listen();
}
bootstrap();
