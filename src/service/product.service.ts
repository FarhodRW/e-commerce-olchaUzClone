
import { ProductError } from "../db/model/product/product.error";
import { ProductModel } from "../db/model/product/product.model";
import { ProductDto } from "../db/dto/product.dto";

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

export async function getSingleProductService(query) {
  const product = await ProductModel.findById(query)
  if (!product) throw ProductError.NotFound(query)
  return product
}

export async function getProductsByCategoryService(query) {
  //query --> categoryId
  const product = await ProductModel.find({ query })

  if (!product) throw ProductError.NotFound(query)
  return product
}


//mvp