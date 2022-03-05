import { IsOptional, IsString, MinLength } from 'class-validator'
import 'reflect-metadata'
import { Type } from 'class-transformer';

import { BaseDtoGroup } from './common.dto'


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
  city!: string;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE, UserDtoGroup.REGISTER]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  street!: string;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE, UserDtoGroup.REGISTER]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  postCode!: string;
}

export class UserDto {
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  name!: string;

  @IsOptional({
    groups: [UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE, UserDtoGroup.LOGIN]
  })
  @MinLength(3, {
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  password!: string;

  @IsString({ groups: [UserDtoGroup.REGISTER, UserDtoGroup.LOGIN] })
  email!: string;

  @IsOptional({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  @Type(() => AddressDto)
  position!: AddressDto;

}