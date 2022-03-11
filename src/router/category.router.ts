import express from 'express'
import { createCategoryController, deleteCategoryController, getCategoriesController, getSubCategoriesController, updateCategoryController } from '../controller/category.controller'
import { verifyToken } from '../middleware/authorization'
import { upload } from '../middleware/upload'

const router = express.Router()

router.post('/create', verifyToken, createCategoryController)
router.put('/update/:id', verifyToken, updateCategoryController)
router.delete('/:id', verifyToken, deleteCategoryController)
router.get('/', getCategoriesController)

router.get('/sub/:id', getSubCategoriesController)

export default router