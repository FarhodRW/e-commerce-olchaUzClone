import express from 'express'
import { createAdminController, getAdminUsersController, getUserController, loginAdminController, updateUserController } from '../controller/adminUser.controller'
import { deleteUserController, getUsersController } from '../controller/user.controller'
import { verifyAdminToken, verifySuperAdmin } from '../middleware/verifyAdmin'

const router = express.Router()

router.post('/create', verifyAdminToken, verifySuperAdmin, createAdminController)
router.post('/login', loginAdminController)

router.get('/:id', verifyAdminToken, getUserController)
router.post('/', verifyAdminToken, getUsersController)
router.post('/admins', verifyAdminToken, getAdminUsersController)
router.put('/:id', verifyAdminToken, updateUserController)
router.delete('/:id', verifyAdminToken, deleteUserController)

export default router