import { CategoryError } from "../db/model/category/category.error";
import { CategoryModel } from "../db/model/category/category.model";
import { CategoryDto } from "../db/dto/category.dto";
import { BasePagingDto } from "../db/dto/common.dto";

export async function createCategoryService(dto: CategoryDto) {
  const newCategory = new CategoryModel(dto)
  await newCategory.save()
  return newCategory
}



export async function updateUserCategoryService(query, dto: CategoryDto) {
  const category = await CategoryModel.findByIdAndUpdate(query, { $set: dto }, { new: true })
  if (!category) throw CategoryError.NotFound()
  return category
}

export async function deleteCategoryService(query) {
  const category = await CategoryModel.findByIdAndDelete(query)
  if (!category) throw CategoryError.NotFound()
  return category
}

export async function getCategoryService() {
  const category = await CategoryModel.find({ "isParent": true })
  if (!category) throw CategoryError.NotFound()
  return category
}


export async function getSubCategoriesService(query: BasePagingDto) {
  const id = query.categoryId
  const subCategory = await CategoryModel.find({ id })
    .limit(query.limit)
    .skip(query.page * query.limit)
    .sort({
      title: 'asc'
    })
  if (!subCategory) throw CategoryError.NotFound()
  return subCategory
}

export async function getSubCategoryService(query: BasePagingDto) {
  const id = query.categoryId
  const subCategory = await CategoryModel.find({ id })
    .limit(query.limit)
    .skip(query.page * query.limit)
    .sort({
      title: 'asc'
    })
  if (!subCategory) throw CategoryError.NotFound()
  return subCategory
}



//mvp