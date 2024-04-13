import { NestFactory } from '@nestjs/core';
import { AppMailerModule } from './mailer.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppMailerModule, {
    transport: Transport.TCP,
  });
  await app.listen();
}
bootstrap();
