
import { Router } from 'express'
import { uploadController } from '../controller/upload.controller';
import { verifyToken } from '../middleware/authorization';
import { upload } from '../middleware/upload';

export const uploadRouter = Router();


uploadRouter.post('', verifyToken, upload.single('file'), uploadController)