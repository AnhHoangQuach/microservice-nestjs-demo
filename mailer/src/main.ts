import { NestFactory } from '@nestjs/core';
import { AppMailerModule } from './mailer.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppMailerModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.MAILER_SERVICE_PORT,
    },
  });
  await app.listen();
}
bootstrap();
