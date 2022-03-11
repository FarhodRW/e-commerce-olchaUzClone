import { ProductDto, ProductDtoGroup } from "../db/dto/product.dto"
import { success } from "../common/helpers"
import { validateIt } from "../common/validation"
import { createProductService, deleteProductService, getSingleProductService, updateUserProductService } from "../service/product.service"

export async function createProductController(req, res, next) {

  try {
    const dto = await validateIt(req.body, ProductDto, ProductDtoGroup.CREATE)
    dto.createdBy = req.user._id
    console.log(dto)
    const newProduct = await createProductService(dto)
    success(res, newProduct)
  } catch (err) {
    next(err)
    console.log(err);

  }
}



export async function updateProductController(req, res, next) {
  try {
    const query = req.params.id
    const dto = await validateIt(req.body, ProductDto, ProductDtoGroup.UPDATE)
    console.log(dto)
    const user = await updateUserProductService(query, dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}


export async function deleteProductController(req, res, next) {
  try {
    const query = req.params.id
    const user = await deleteProductService(query)
    success(res, 'succcess')
  } catch (error) {
    next(error)
  }
}


export async function getSingleProductController(req, res, next) {
  try {
    const query = req.params.id
    const product = await getSingleProductService(query)
    success(res, product)
  } catch (error) {
    next(error)
  }
}