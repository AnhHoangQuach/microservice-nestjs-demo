import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<IProduct>,
  ) {}

  public async createProduct(productBody: IProduct): Promise<IProduct> {
    const productModel = new this.productModel(productBody);
    return await productModel.save();
  }

  public async findProductById(id: string) {
    return await this.productModel.findById(id);
  }

  public async fetchProducts() {
    return await this.productModel.find();
  }
}
