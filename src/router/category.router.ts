import express from 'express'
import { createCategoryController, deleteCategoryController, getCategoryPagingController, getProductsFromAnyCategoryController, updateCategoryController } from '../controller/category.controller'
import { verifyAdminToken } from '../middleware/verifyAdmin'

const router = express.Router()

router.post('/create', verifyAdminToken, createCategoryController)
router.put('/update/:id', verifyAdminToken, updateCategoryController)
router.delete('/', verifyAdminToken, deleteCategoryController)
router.post('/', getCategoryPagingController)
router.post('/all', getProductsFromAnyCategoryController)

export default router