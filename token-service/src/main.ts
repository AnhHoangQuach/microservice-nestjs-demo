import { NestFactory } from '@nestjs/core';
import { TokenModule } from './token.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TokenModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.TOKEN_SERVICE_PORT,
    },
  });
  await app.listen();
}
bootstrap();
