
import { ProductError } from "../db/model/product/product.error";
import { Product, ProductModel } from "../db/model/product/product.model";
import { ProductDto, ProductGetDto } from "../db/dto/product.dto";
import { FilterQuery, Document, Types } from 'mongoose'
import { CollectionNames } from "../db/common/common.model";
import { findPaging } from "./base.service";

export async function createProductService(dto: ProductDto) {
  const newProduct = new ProductModel(dto)
  await newProduct.save()
  return newProduct
}
export async function getProductByIdService(id, isDeleted?: false) {
  const product = await ProductModel.findById(id);

  if (!product || product.isDeleted && !isDeleted) throw ProductError.NotFound(id);

  return product;
}

export async function updateUserProductService(query, dto: ProductDto) {
  const Product = await ProductModel.findByIdAndUpdate(query, { $set: dto }, { new: true })
  if (!Product) throw ProductError.NotFound()
  return Product
}

export async function deleteProductService(query) {
  const Product = await ProductModel.findByIdAndDelete(query)
  if (!Product) throw ProductError.NotFound()
  return Product
}


export async function getProductPagingService(dto: ProductGetDto) {
  const { page, limit, search } = dto;

  const query: FilterQuery<Product & Document> = {
    isDeleted: false
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

  const $lookupCategory = {
    $lookup: {
      from: CollectionNames.CATEGORIES,
      localField: 'categoryId',
      foreignField: '_id',
      as: 'category'
    }
  }

  const $unwindCategory = {
    $unwind: {
      path: '$category',
      preserveNullAndEmptyArrays: true
    }
  }

  const $project = {
    $project: {
      _id: 1,
      title: 1,
      category: {
        _id: 1,
        title: 1
      },
      images: 1,
      price: 1
    }
  }

  const $sort = {
    title: 1
  }

  const pipeline = [$lookupCategory, $unwindCategory, $project];

  const data = await findPaging(ProductModel, query, page, limit, pipeline, $sort);
  console.log(data)
  return data;

}



//mvp