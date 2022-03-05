import express from 'express'
import { createUserController, loginUserController } from '../controller/user.controller'

const router = express.Router()

router.post('/register', createUserController)
router.post('/login', loginUserController)

export default router