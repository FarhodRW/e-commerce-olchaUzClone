import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator'
import 'reflect-metadata'
import { Type } from 'class-transformer';

import { BaseDtoGroup, BasePagingDto } from './common.dto'
import { BaseDto } from './common.dto';

export class ReviewDtoGroup extends BaseDtoGroup { }


export class ReviewDto extends BaseDto {

  @IsMongoId({
    groups: [ReviewDtoGroup.GET_PAGING, ReviewDtoGroup.CHOOSE,
    ReviewDtoGroup.CREATE, ReviewDtoGroup.UPDATE]
  })
  productId: string;

  @IsNotEmpty({
    groups: [ReviewDtoGroup.GET_PAGING, ReviewDtoGroup.CHOOSE,
    ReviewDtoGroup.CREATE, ReviewDtoGroup.UPDATE]
  })
  createdBy: string;

  @Min(1, {
    groups: [ReviewDtoGroup.CREATE, ReviewDtoGroup.UPDATE]
  })
  @Max(5, {
    groups: [ReviewDtoGroup.CREATE, ReviewDtoGroup.UPDATE]
  })
  rating: number;

  @IsString({
    groups: [ReviewDtoGroup.CREATE, ReviewDtoGroup.UPDATE]
  })
  comment: string;
}