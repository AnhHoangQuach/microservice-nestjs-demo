import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IOrder } from './interfaces/order.interface';
import { IOrderCreate } from './interfaces/order-create.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<IOrder>,
  ) {}

  public async createOrder(orderBody: IOrderCreate): Promise<IOrder> {
    const orderModel = new this.orderModel(orderBody);
    return await orderModel.save();
  }

  public async findOrderById(id: string) {
    return await this.orderModel.findById(id);
  }

  public async fetchOrders(id: string) {
    return await this.orderModel.find({ user_id: String(id) });
  }
}
