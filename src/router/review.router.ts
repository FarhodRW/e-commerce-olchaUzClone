import express from 'express'
import { createReviewController, deleteReviewController, getReviewPagingController, updateReviewController } from '../controller/review.controller'
import { verifyToken } from '../middleware/authorization'

const router = express.Router()

router.post('/create', verifyToken, createReviewController)
router.put('/update/:id', verifyToken, updateReviewController)
router.delete('/:id', verifyToken, deleteReviewController)
router.post('/', getReviewPagingController)

export default router


//mvp done