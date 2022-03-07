import express from 'express'
import { createReviewController, deleteReviewController, updateReviewController } from '../controller/review.controller'
import { verifyToken } from '../middleware/authorization'

const router = express.Router()

router.post('/create', verifyToken, createReviewController)
router.put('/update/:id', verifyToken, updateReviewController)
router.delete('/:id', verifyToken, deleteReviewController)

export default router


//mvp done