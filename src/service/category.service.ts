import { CategoryError } from "../db/model/category/category.error";
import { Category, CategoryModel } from "../db/model/category/category.model";
import { CategoryDto, CategoryGetDto } from "../db/dto/category.dto";
import { BasePagingDto } from "../db/dto/common.dto";
import { FilterQuery, Document, Types } from 'mongoose'
import { CollectionNames } from "../db/common/common.model";
import { findPaging } from "./base.service";

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

export async function getCategoryPagingService(dto: CategoryGetDto) {

  const { page, limit, isTop, parentId, search } = dto;

  const query: FilterQuery<Category & Document> = {
    isDeleted: false
  }
  if (isTop) {
    query.parentId = {
      $exists: false
    }
  } else if (parentId) {
    query.parentId = new Types.ObjectId(parentId)
  }
  if (search) {
    query.$or = [
      {
        'title.uz': {
          $regex: search,
          $options: 'i',
        }
      },
      {
        'title.ru': {
          $regex: search,
          $options: 'i',
        }
      },
      {
        'title.en': {
          $regex: search,
          $options: 'i',
        }
      }
    ]
  }

  const $lookupParent = {
    $lookup: {
      from: CollectionNames.CATEGORIES,
      localField: 'parentId',
      foreignField: '_id',
      as: 'parent'
    }
  }

  const $unwindParent = {
    $unwind: {
      path: '$parent',
      preserveNullAndEmptyArrays: true
    }
  }

  const $project = {
    $project: {
      _id: 1,
      title: 1,
      parent: {
        _id: 1,
        title: 1
      },
      image: 1
    }
  }

  const $sort = {
    createdAt: -1
  }

  const pipeline = [$lookupParent, $unwindParent, $project];

  const data = await findPaging(CategoryModel, query, page, limit, pipeline, $sort);
  console.log(data)
  return data;
}

//mvp