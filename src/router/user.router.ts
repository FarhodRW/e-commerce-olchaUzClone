import express from 'express'
import { createUserController, deleteUserController, getUserProfileController, loginUserController, updateUserController } from '../controller/user.controller'
import { verifyToken } from '../middleware/authorization'

const router = express.Router()

router.post('/register', createUserController)
router.post('/login', loginUserController)
router.get('/profile', verifyToken, getUserProfileController)
router.put('/update', verifyToken, updateUserController)
router.delete('/delete', verifyToken, deleteUserController)

export default router