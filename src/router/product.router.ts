import express from 'express'
import { createProductController, deleteProductController, getProductByIdController, getProductPagingController, updateProductController } from '../controller/product.controller'
import { verifyAdminToken } from '../middleware/verifyAdmin'

const router = express.Router()

router.post('/create', verifyAdminToken, createProductController)
router.put('/update/:id', verifyAdminToken, updateProductController)
router.delete('/:id', verifyAdminToken, deleteProductController)
router.post('/', getProductPagingController)
router.get('/:id', getProductByIdController)

export default router


//mvp done