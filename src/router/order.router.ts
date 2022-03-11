import express from 'express'
import { createOrderController, deleteOrderController, getOrderByIdController, updateOrderController } from '../controller/order.controller'
import { verifyToken } from '../middleware/authorization'

const router = express.Router()

router.post('/create', verifyToken, createOrderController)
router.get('/:id', verifyToken, getOrderByIdController)
router.put('/update/:id', verifyToken, updateOrderController)
router.delete('/:id', verifyToken, deleteOrderController)

export default router


//mvp done