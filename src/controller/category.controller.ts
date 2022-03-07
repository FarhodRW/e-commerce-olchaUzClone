import { CategoryDto, CategoryDtoGroup } from "../db/dto/category.dto"
import { UserDto, UserDtoGroup } from "../db/dto/user.dto"
import { success } from "../common/helpers"
import { validateIt } from "../common/validation"
import { createCategoryService, deleteCategoryService, updateUserCategoryService } from "../service/category.service"

export async function createCategoryController(req, res, next) {

  try {
    req.body.createdBy = req.user._id
    console.log(req.body)
    const dto = await validateIt(req.body, CategoryDto, CategoryDtoGroup.CREATE)
    console.log(dto)
    const newCategory = await createCategoryService(dto)
    success(res, newCategory)
  } catch (err) {
    next(err)
  }
}



export async function updateCategoryController(req, res, next) {
  try {
    const query = req.params.id
    const dto = await validateIt(req.body, CategoryDto, CategoryDtoGroup.UPDATE)
    console.log(dto)
    const user = await updateUserCategoryService(query, dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}


export async function deleteCategoryController(req, res, next) {
  try {
    const query = req.params.id
    const user = await deleteCategoryService(query)
    success(res, 'succcess')
  } catch (error) {
    next(error)
  }
}