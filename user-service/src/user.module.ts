import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './configs/mongo-config.service';
import { UserLinkSchema } from './schemas/user-link.schema';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
      {
        name: 'UserLink',
        schema: UserLinkSchema,
        collection: 'user_links',
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'MAILER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.MAILER_SERVICE_HOST,
            port: parseInt(process.env.MAILER_SERVICE_PORT),
          },
        });
      },
    },
  ],
})
export class UserModule {}
