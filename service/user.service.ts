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