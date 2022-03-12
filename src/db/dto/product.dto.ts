import { IsArray, IsBoolean, IsMongoId, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, Min, MinLength, ValidateNested } from 'class-validator'
import 'reflect-metadata'
import { Type } from 'class-transformer';

import { BaseDtoGroup, BasePagingDto } from './common.dto'
import { BaseDto } from './common.dto';

export class ProductDtoGroup extends BaseDtoGroup { }

export class LanguageDto {
  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  uz: string;

  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  ru: string;

  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  en: string;
}

export class ProductDto extends BaseDto {
  @ValidateNested({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  @Type(() => LanguageDto)
  title: LanguageDto;

  @IsArray({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  @IsOptional({ groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE] })
  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE],
    each: true
  })
  images: string[];

  @IsOptional({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  @IsMongoId({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  categoryId: string;

  @Min(1, {
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  price: number;

  @IsOptional({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  @IsString({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  description: string;

  @IsBoolean({
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  inStock: boolean;

  @Min(1, {
    groups: [ProductDtoGroup.CREATE, ProductDtoGroup.UPDATE]
  })
  quantity: number;
}


export class ProductGetDto extends BasePagingDto { }