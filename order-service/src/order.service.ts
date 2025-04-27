import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly OrderModel: Model<IOrder>,
  ) {}

  public async createOrder(orderBody: IOrder): Promise<IOrder> {
    const OrderModel = new this.OrderModel(orderBody);
    return await OrderModel.save();
  }

  public async findOrderById(id: string) {
    return await this.OrderModel.findById(id);
  }

  public async fetchOrders(user_id: string) {
    return await this.OrderModel.find({ user_id });
  }
}
