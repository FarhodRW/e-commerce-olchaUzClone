import { CategoryDto, CategoryDtoGroup, CategoryGetDto } from "../db/dto/category.dto"
import { UserDto, UserDtoGroup } from "../db/dto/user.dto"
import { success } from "../common/helpers"
import { validateIt } from "../common/validation"
import { createCategoryService, deleteCategoryService, getCategoryPagingService, updateUserCategoryService } from "../service/category.service"
import { BaseDtoGroup, BasePagingDto } from "../db/dto/common.dto"

export async function createCategoryController(req, res, next) {

  try {
    req.body.createdBy = req.user._id
    console.log(req.body)
    const dto = await validateIt(req.body, CategoryDto, CategoryDtoGroup.CREATE)
    console.log(dto)
    if (dto.parentId) { dto.isParent = true }
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


//it should be delete many
export async function deleteCategoryController(req, res, next) {
  try {
    const query = req.params.id
    const user = await deleteCategoryService(query)
    success(res, 'succcess')
  } catch (error) {
    next(error)
  }
}

export async function getCategoryPagingController(req, res, next) {
  try {
    const data = await validateIt(req.body, CategoryGetDto, CategoryDtoGroup.GET_PAGING);

    const categories = await getCategoryPagingService(data)

    success(res, categories)
  } catch (error) {
    next(error)
  }
}



