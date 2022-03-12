import express from 'express'
import { createCategoryController, deleteCategoryController, getCategoryPagingController, updateCategoryController } from '../controller/category.controller'
import { verifyToken } from '../middleware/authorization'

const router = express.Router()

router.post('/create', verifyToken, createCategoryController)
router.put('/update/:id', verifyToken, updateCategoryController)
router.delete('/:id', verifyToken, deleteCategoryController)
router.post('/', getCategoryPagingController)

export default router