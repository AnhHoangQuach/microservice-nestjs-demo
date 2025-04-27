import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

import { Authorization } from './decorators/authorization.decorator';

import { GetOrderResponseDto } from './interfaces/order/dto/get-order-response.dto';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { CreateOrderResponseDto } from './interfaces/order/dto/create-order-response.dto';
import { CreateOrderDto } from './interfaces/order/dto/create-order.dto';
import { FetchOrdersResponseDto } from './interfaces/order/dto/fetch-orders-response.dto';
import { IServiceOrderCreateResponse } from './interfaces/order/service-order-create-response.interface';
import { IServiceOrderFetchResponse } from './interfaces/order/service-order-fetch-response.interface';
import { IServiceOrderResponse } from './interfaces/order/service-order-get-by-id-response.interface';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderServiceClient: ClientProxy,
  ) {}

  @Get()
  @Authorization(true)
  public async fetchOrders(
    @Req() request: IAuthorizedRequest,
  ): Promise<FetchOrdersResponseDto> {
    const userInfo = request.user;
    const ordersResponse: IServiceOrderFetchResponse = await firstValueFrom(
      this.orderServiceClient.send('fetch_orders', userInfo.id),
    );

    return {
      message: ordersResponse.message,
      orders: ordersResponse.orders,
      errors: null,
    };
  }

  @Get(':id')
  public async getOrderById(
    @Param('id') id: string,
  ): Promise<GetOrderResponseDto> {
    const orderResponse: IServiceOrderResponse = await firstValueFrom(
      this.orderServiceClient.send('order_get_by_id', id),
    );

    return {
      message: orderResponse.message,
      order: orderResponse.order,
      errors: orderResponse.errors,
    };
  }

  @Post()
  @Authorization(true)
  public async createOrder(
    @Req() request: IAuthorizedRequest,
    @Body() orderRequest: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    const userInfo = request.user;
    const createOrderResponse: IServiceOrderCreateResponse =
      await firstValueFrom(
        this.orderServiceClient.send(
          'order_create',
          Object.assign(orderRequest, { user_id: userInfo.id }),
        ),
      );

    if (createOrderResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createOrderResponse.message,
          data: null,
          errors: createOrderResponse.errors,
        },
        createOrderResponse.status,
      );
    }

    return {
      message: createOrderResponse.message,
      order: createOrderResponse.order,
      errors: null,
    };
  }
}
