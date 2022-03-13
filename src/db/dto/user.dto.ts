import { IsArray, IsBoolean, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator'
import 'reflect-metadata'
import { Type } from 'class-transformer';

import { BaseDtoGroup, BasePagingDto } from './common.dto'
import { BaseDto } from './common.dto';


export class UserDtoGroup extends BaseDtoGroup {
  static LOGIN = 'login'
  static VERIFY = 'verify'
  static REGISTER = 'register'
}

class AddressDto {
  @IsOptional({
    groups: [UserDtoGroup.UPDATE, UserDtoGroup.REGISTER]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  city: string;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE, UserDtoGroup.REGISTER]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  street: string;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE, UserDtoGroup.REGISTER]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  postCode: string;
}

export class UserDto extends BaseDto {
  @IsOptional({
    groups: [UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  name: string;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE, UserDtoGroup.LOGIN]
  })
  @MinLength(3, {
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  password: string;

  @IsString({ groups: [UserDtoGroup.REGISTER, UserDtoGroup.LOGIN] })
  email: string;

  @IsOptional({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  @ValidateNested({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  @Type(() => AddressDto)
  address: AddressDto;

  @IsArray({
    groups: [UserDtoGroup.UPDATE]
  })

  @IsOptional({ groups: [UserDtoGroup.UPDATE] })
  @IsString({
    groups: [UserDtoGroup.UPDATE],
    each: true
  })
  favoriteIds: string[];

  @IsOptional({
    groups: [UserDtoGroup.UPDATE, UserDtoGroup.REGISTER,]
  })
  @IsBoolean({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  isAdmin?: boolean;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE, UserDtoGroup.REGISTER,]
  })
  @IsBoolean({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  isSuperAdmin?: boolean;

}

export class UserGetDto extends BasePagingDto { }