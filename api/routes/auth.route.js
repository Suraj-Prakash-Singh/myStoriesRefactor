import express from 'express';
import { signupController } from '../controllers/auth.controller.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/signup', upload.single('file'), signupController);
export default router;
