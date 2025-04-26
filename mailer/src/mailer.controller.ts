import { MailerService } from '@nestjs-modules/mailer';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IEmailData } from './interfaces/email-data.interface';
import { IMailSendResponse } from './interfaces/mail-send-response.interface';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern('mail_send')
  mailSend(data: IEmailData): IMailSendResponse {
    this.mailerService.sendMail(data);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'mail_send_success',
    };
  }
}
