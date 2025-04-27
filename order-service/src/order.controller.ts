import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { IOrderCreateResponse } from './interfaces/order-create-response.interface';
import { IOrderFetchResponse } from './interfaces/order-fetch-response.interface';
import { IOrderSearchResponse } from './interfaces/order-search-response.interface';
import { IOrder } from './interfaces/order.interface';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('fetch_orders')
  public async fetchOrders(user_id: string): Promise<IOrderFetchResponse> {
    const orders = await this.orderService.fetchOrders(user_id);
    return {
      status: HttpStatus.OK,
      message: 'fetch_orders_success',
      orders,
    };
  }

  @MessagePattern('order_get_by_id')
  public async getOrderById(id: string): Promise<IOrderSearchResponse> {
    let result: IOrderSearchResponse;

    if (id) {
      const order = await this.orderService.findOrderById(id);
      result = {
        status: HttpStatus.OK,
        message: 'order_get_by_id_success',
        order,
      };
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'order_get_by_id_bad_request',
        order: null,
      };
    }

    return result;
  }

  @MessagePattern('order_create')
  public async orderCreate(orderBody: IOrder): Promise<IOrderCreateResponse> {
    let result: IOrderCreateResponse;

    if (orderBody) {
      try {
        const order = await this.orderService.createOrder(orderBody);
        result = {
          status: HttpStatus.CREATED,
          message: 'order_create_success',
          order,
          errors: null,
        };
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'order_create_precondition_failed',
          order: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'order_create_bad_request',
        order: null,
        errors: null,
      };
    }

    return result;
  }
}
