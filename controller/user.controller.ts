import { UserDto, UserDtoGroup } from "../dto/user.dto"
import { success } from "../middleware/helpers"
import { validateIt } from "../middleware/validation"
import { createUserService, loginUserService } from "../service/user.service"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserError } from "../db/model/user/user.error"
import { UserModel } from "../db/model/user/user.model"

export async function createUserController(req, res, next) {

  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {

      throw UserError.AlreadyExists()
    }
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.REGISTER)

    dto.password = await bcrypt.hash(dto.password, 8)
    const newUser = await createUserService(dto)
    success(res, newUser)
  } catch (err) {
    next(err)
  }
}


export async function loginUserController(req, res, next) {
  try {
    let data = await validateIt(req.body, UserDto, UserDtoGroup.LOGIN)
    console.log(req.body);

    const user = await loginUserService(data.email)

    const compare = await bcrypt.compare(data.password, user.password)
    if (!compare) throw UserError.NotFound(data.email)

    const token = jwt.sign({
      _id: user._id
    }, process.env.JWTKEY)
    success(res, [token, user])
  } catch (error) {
    next(error)
  }
}