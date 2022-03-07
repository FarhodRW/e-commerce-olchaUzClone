
import { ProductError } from "../db/model/product/product.error";
import { ProductModel } from "../db/model/product/product.model";
import { ProductDto } from "../dto/product.dto";

export async function createProductService(dto: ProductDto) {
  const newProduct = new ProductModel(dto)
  await newProduct.save()
  return newProduct
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


//mvp