import { IsArray, IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, Min, MinLength, ValidateNested } from 'class-validator'
import 'reflect-metadata'
import { Type } from 'class-transformer';

import { BaseDtoGroup, BasePagingDto } from './common.dto'
import { BaseDto } from './common.dto';
import { ORDER_STATE } from '../model/order/order.model';

export class OrderDtoGroup extends BaseDtoGroup {
  static SET_STATE = 'setstate'
}

export class OrderedProductsDto {
  @IsMongoId({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  productId: string;

  @IsNotEmpty({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  @Min(1, {
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  quantity: number;

  discount: number;
  tax: number;
  orderId;
  cost: number;
  price: number;
  categoryId;
}


export class OrderDto extends BaseDto {
  @IsMongoId({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  userId: string;

  @IsArray({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  @ValidateNested({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  @Type(() => OrderedProductsDto)
  products: OrderedProductsDto[];

  @IsNotEmpty({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  @Min(1, {
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE]
  })
  amount: number;

  @IsString({
    groups: [OrderDtoGroup.CREATE, OrderDtoGroup.UPDATE],
  })
  address: string;

  @IsEnum(ORDER_STATE, {
    groups: [OrderDtoGroup.SET_STATE],
  })
  state: ORDER_STATE;

  total_purchase: number;
  total_cost: number;
  total_price: number;
  total_discount: number;
  delivery_price: number;
  total_tax: number;
}