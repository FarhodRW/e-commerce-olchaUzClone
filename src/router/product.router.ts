import express from 'express'
import { createProductController, deleteProductController, updateProductController } from '../controller/product.controller'
import { verifyToken } from '../middleware/authorization'

const router = express.Router()

router.post('/create', verifyToken, createProductController)
router.put('/update/:id', verifyToken, updateProductController)
router.delete('/:id', verifyToken, deleteProductController)

export default router


//mvp done