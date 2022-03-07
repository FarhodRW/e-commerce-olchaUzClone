import { UserDefinedError } from "../db/common/common.error";
import { UserError } from "../db/model/user/user.error";
import { User, UserModel } from "../db/model/user/user.model";
import { UserDto } from "../dto/user.dto";

export async function createUserService(dto: UserDto) {
  const newUser = new UserModel(dto)
  await newUser.save()
  return newUser
}

export async function loginUserService(email) {
  const query = { email }
  const user = UserModel.findOne({ query })
  if (!user) throw UserError.NotFound(email)
  console.log(user)
  return user
}


export async function getUserService(query) {
  const user = UserModel.findById(query)
  if (!user) throw UserError.NotFound(query)
  return user

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