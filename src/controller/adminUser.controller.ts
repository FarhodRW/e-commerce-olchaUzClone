import { UserDto, UserDtoGroup, UserGetDto } from "../db/dto/user.dto"
import { success } from "../common/helpers"
import { validateIt } from "../common/validation"
import { createUserService, deleteUserService, getAdminUsersService, getUserService, getUsersService, loginAdminUserService, loginUserService, updateUserService } from "../service/user.service"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserError } from "../db/model/user/user.error"

export async function createAdminController(req, res, next) {

  try {
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.REGISTER)
    dto.isAdmin = true
    dto.password = await bcrypt.hash(dto.password, 8)
    const newUser = await createUserService(dto)
    success(res, newUser)
  } catch (err) {
    next(err)
  }
}


export async function loginAdminController(req, res, next) {
  try {
    let data = await validateIt(req.body, UserDto, UserDtoGroup.LOGIN)
    console.log(data.email)

    const user = await loginAdminUserService(data.email)

    const compare = await bcrypt.compare(data.password, user.password)
    if (!compare) throw UserError.NotFound(data.email)

    const token = jwt.sign({
      _id: user._id
    }, process.env.JWTADMINKEY)
    success(res, { user, token })
  } catch (error) {
    next(error)
  }
}


export async function getUsersController(req, res, next) {
  try {
    const dto = await validateIt(req.body, UserGetDto, UserDtoGroup)
    const user = await getUsersService(dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}

export async function getAdminUsersController(req, res, next) {
  try {
    const dto = await validateIt(req.body, UserGetDto, UserDtoGroup)
    const user = await getAdminUsersService(dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}


export async function getUserController(req, res, next) {
  try {
    const userId = req.params.id
    const user = await getUserService(userId)
    success(res, user)
  } catch (error) {
    next(error)
  }
}

export async function updateUserController(req, res, next) {
  try {
    const query = req.params.id
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.UPDATE)
    const user = await updateUserService(query, dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}


export async function deleteUserController(req, res, next) {
  try {
    const userId = req.user._id

    const user = await deleteUserService(userId)
    success(res, 'succcess')
  } catch (error) {
    next(error)
  }
}

