import { NestFactory } from '@nestjs/core';
import { TaskModule } from './task.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TaskModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.TASK_SERVICE_PORT,
    },
  });
  await app.listen();
}
bootstrap();
