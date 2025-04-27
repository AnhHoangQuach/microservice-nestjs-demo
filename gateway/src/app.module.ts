import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';

import { ProductsController } from './products.controller';
import { UsersController } from './users.controller';

import { AuthGuard } from './services/guards/authorization.guard';

import { RateLimiterMiddleware } from './middlewares/rate-limiter.middleware';
import { OrdersController } from './orders.controller';
import { ConfigService } from './services/config/config.service';
import { RedisService } from './services/redis.service';

@Module({
  imports: [],
  controllers: [UsersController, ProductsController, OrdersController],
  providers: [
    ConfigService,
    {
      provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('tokenService');
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('productService'));
      },
      inject: [ConfigService],
    },
    {
      provide: 'ORDER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('orderService'));
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    RedisService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimiterMiddleware).forRoutes('/login', '/users');
  }
}
