import { UserDefinedError } from "../db/common/common.error";
import { UserError } from "../db/model/user/user.error";
import { User, UserModel } from "../db/model/user/user.model";
import { UserDto, UserGetDto } from "../db/dto/user.dto";
import { FilterQuery, Document, Types } from 'mongoose'
import { findPaging } from "./base.service";


export async function createUserService(dto: UserDto) {
  const newUser = new UserModel(dto)
  await newUser.save()
  return newUser
}

export async function loginAdminUserService(email) {
  const query = { email }
  const user = await UserModel.findOne({ query })
  if (!user) throw UserError.NotFound(email)
  console.log(user)
  if (!user.isAdmin) throw UserDefinedError.NotEnoughPermission(query)
  return user
}

export async function loginUserService(email) {
  const query = { email }
  const user = await UserModel.findOne({ query })
  if (!user) throw UserError.NotFound(email)
  console.log(user)
  return user
}

export async function getUserService(query) {
  const user = UserModel.findById(query)
  if (!user) throw UserError.NotFound(query)
  return user

}

export async function getUsersService(dto: UserGetDto) {
  const { page, limit, search } = dto;

  let query: FilterQuery<User & Document> = {
    isDeleted: false
  }

  if (search) {
    query = {
      'name': {
        $regex: search,
        $options: 'i',
      }
    }
  }

  const $project = {
    $project: {
      password: 0,
    }
  }

  const $sort = {
    createdAt: -1
  }

  const pipeline = [$project];

  const data = await findPaging(UserModel, query, page, limit, pipeline, $sort);
  console.log(data)
  return data;
}


export async function getAdminUsersService(dto: UserGetDto) {
  const { page, limit, search } = dto;

  let query: FilterQuery<User & Document> = {
    isDeleted: false,
    isAdmin: true
  }

  if (search) {
    query = {
      'name': {
        $regex: search,
        $options: 'i',
      }
    }
  }

  const $project = {
    $project: {
      password: 0,
    }
  }

  const $sort = {
    createdAt: -1
  }

  const pipeline = [$project];

  const data = await findPaging(UserModel, query, page, limit, pipeline, $sort);
  console.log(data)
  return data;
}


export async function updateUserService(query, dto) {
  const user = await UserModel.findByIdAndUpdate(query, { $set: dto }, { new: true })
  if (!user) throw UserError.NotFound()
  return user
}

export async function deleteUserService(query) {
  const user = await UserModel.findByIdAndDelete(query)
  if (!user) throw UserError.NotFound()
  return user
}


//mvp