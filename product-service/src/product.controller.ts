import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { IProductCreateResponse } from './interfaces/product-create-response.interface';
import { IProductSearchResponse } from './interfaces/product-search-response.interface';
import { IProduct } from './interfaces/product.interface';
import { ProductService } from './product.service';
import { IProductFetchResponse } from './interfaces/product-fetch-response.interface';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('fetch_products')
  public async fetchProducts(): Promise<IProductFetchResponse> {
    const products = await this.productService.fetchProducts();
    return {
      status: HttpStatus.OK,
      message: 'fetch_products_success',
      products,
    };
  }

  @MessagePattern('product_get_by_id')
  public async getProductById(id: string): Promise<IProductSearchResponse> {
    let result: IProductSearchResponse;

    if (id) {
      const product = await this.productService.findProductById(id);
      result = {
        status: HttpStatus.OK,
        message: 'product_get_by_id_success',
        product,
      };
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'product_get_by_id_bad_request',
        product: null,
      };
    }

    return result;
  }

  @MessagePattern('product_create')
  public async productCreate(
    productBody: IProduct,
  ): Promise<IProductCreateResponse> {
    let result: IProductCreateResponse;

    if (productBody) {
      try {
        const product = await this.productService.createProduct(productBody);
        result = {
          status: HttpStatus.CREATED,
          message: 'product_create_success',
          product,
          errors: null,
        };
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'product_create_precondition_failed',
          product: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'product_create_bad_request',
        product: null,
        errors: null,
      };
    }

    return result;
  }
}
