import { ProductDto, ProductDtoGroup } from "../dto/product.dto"
import { success } from "../middleware/helpers"
import { validateIt } from "../middleware/validation"
import { createProductService, deleteProductService, updateUserProductService } from "../service/product.service"

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