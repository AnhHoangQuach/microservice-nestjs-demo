import { NestFactory } from '@nestjs/core';
import { TokenModule } from './token.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TokenModule, {
    transport: Transport.TCP,
  });
  await app.listen();
}
bootstrap();
