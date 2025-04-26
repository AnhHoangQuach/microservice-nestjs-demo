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

import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { CreateProductResponseDto } from './interfaces/product/dto/create-product-response.dto';
import { CreateProductDto } from './interfaces/product/dto/create-product.dto';
import { FetchProductsResponseDto } from './interfaces/product/dto/fetch-products-response.dto';
import { GetProductResponseDto } from './interfaces/product/dto/get-product-response.dto';
import { IServiceProductCreateResponse } from './interfaces/product/service-product-create-response.interface';
import { IServiceProductResponse } from './interfaces/product/service-product-get-by-id-response.interface';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productServiceClient: ClientProxy,
  ) {}

  @Get()
  public async fetchProducts(): Promise<FetchProductsResponseDto> {
    const productsResponse: FetchProductsResponseDto = await firstValueFrom(
      this.productServiceClient.send('fetch_products', {}),
    );

    return {
      message: productsResponse.message,
      products: productsResponse.products,
      errors: null,
    };
  }

  @Get(':id')
  public async getProductById(
    @Param('id') id: string,
  ): Promise<IServiceProductResponse> {
    const productsResponse: GetProductResponseDto = await firstValueFrom(
      this.productServiceClient.send('product_get_by_id', id),
    );

    return {
      message: productsResponse.message,
      product: productsResponse.product,
      errors: productsResponse.errors,
    };
  }

  @Post()
  @Authorization(true)
  public async createProduct(
    @Req() request: IAuthorizedRequest,
    @Body() productRequest: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
    const userInfo = request.user;
    const createProductResponse: IServiceProductCreateResponse =
      await firstValueFrom(
        this.productServiceClient.send(
          'product_create',
          Object.assign(productRequest, { create_by_user: userInfo.name }),
        ),
      );

    if (createProductResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createProductResponse.message,
          data: null,
          errors: createProductResponse.errors,
        },
        createProductResponse.status,
      );
    }

    return {
      message: createProductResponse.message,
      product: createProductResponse.product,
      errors: null,
    };
  }
}
