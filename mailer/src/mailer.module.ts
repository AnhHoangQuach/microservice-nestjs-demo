import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerController } from './mailer.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASS,
        },
      },
    }),
  ],
  providers: [],
  controllers: [MailerController],
})
export class AppMailerModule {}
