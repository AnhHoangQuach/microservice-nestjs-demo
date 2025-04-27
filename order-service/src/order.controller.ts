import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { IOrderCreateResponse } from './interfaces/order-create-response.interface';
import { IOrderCreate } from './interfaces/order-create.interface';
import { IOrderFetchResponse } from './interfaces/order-fetch-response.interface';
import { IOrderSearchResponse } from './interfaces/order-search-response.interface';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject('PRODUCT_SERVICE')
    private readonly productServiceClient: ClientProxy,
  ) {}

  @MessagePattern('fetch_orders')
  public async fetchOrders(id: string): Promise<IOrderFetchResponse> {
    const orders = await this.orderService.fetchOrders(id);
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
      const newProducts = [];

      if (order.products) {
        for (let i = 0; i < order.products.length; i++) {
          const productInfo = await firstValueFrom(
            this.productServiceClient.send(
              'product_get_by_id',
              order.products[i].id,
            ),
          );

          newProducts.push(productInfo.product);
        }
      }

      result = {
        status: HttpStatus.OK,
        message: 'order_get_by_id_success',
        order: { ...order.toJSON(), products: newProducts },
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
  public async orderCreate(
    orderBody: IOrderCreate,
  ): Promise<IOrderCreateResponse> {
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
