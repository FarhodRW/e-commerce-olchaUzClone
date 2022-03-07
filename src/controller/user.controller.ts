import { UserDto, UserDtoGroup } from "../db/dto/user.dto"
import { success } from "../common/helpers"
import { validateIt } from "../common/validation"
import { createUserService, deleteUserService, getUserService, loginUserService, updateUserService } from "../service/user.service"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserError } from "../db/model/user/user.error"
import { UserModel } from "../db/model/user/user.model"

export async function createUserController(req, res, next) {

  try {
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.REGISTER)
    // const user = await UserModel.findOne({ email: dto.email })
    // if (user) {

    //   throw UserError.AlreadyExists()
    // }

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
    success(res, { user, token })
  } catch (error) {
    next(error)
  }
}


export async function getUserProfileController(req, res, next) {
  try {
    const query = req.user._id
    console.log(query)
    const user = await getUserService(query)
    success(res, user)
  } catch (error) {
    next(error)
  }
}

export async function updateUserController(req, res, next) {
  try {
    const query = req.user._id
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.UPDATE)
    console.log(dto)
    dto.password = await bcrypt.hash(dto.password, 8)
    const user = await updateUserService(query, dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}


export async function deleteUserController(req, res, next) {
  try {
    const query = req.user._id

    const user = await deleteUserService(query)
    success(res, 'succcess')
  } catch (error) {
    next(error)
  }
}