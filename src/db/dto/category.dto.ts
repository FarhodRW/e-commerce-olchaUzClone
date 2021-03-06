import { IsBoolean, IsMongoId, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator'
import 'reflect-metadata'
import { Type } from 'class-transformer';

import { BaseDtoGroup, BasePagingDto } from './common.dto'
import { BaseDto } from './common.dto';

export class CategoryDtoGroup extends BaseDtoGroup { }

export class LanguageDto {
  @IsString({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  uz: string;

  @IsString({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  ru: string;

  @IsString({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  en: string;
}

export class CategoryDto extends BaseDto {
  @ValidateNested({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  @Type(() => LanguageDto)

  title: LanguageDto;

  @IsOptional({
    groups: [CategoryDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  image: string;

  @IsOptional({
    groups: [CategoryDtoGroup.UPDATE]
  })
  @IsOptional({ groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE] })
  @IsString({ groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE] })
  parentId?: string;

  @IsBoolean({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  isParent: boolean = false
}

export class CategoryGetDto extends BasePagingDto {
  @IsOptional({
    groups: [CategoryDtoGroup.GET_PAGING]
  })
  @IsBoolean({
    groups: [CategoryDtoGroup.GET_PAGING]
  })
  isTop: boolean;

  @IsOptional({
    groups: [CategoryDtoGroup.GET_PAGING]
  })
  @IsMongoId({
    groups: [CategoryDtoGroup.GET_PAGING]
  })
  parentId?: string;
}