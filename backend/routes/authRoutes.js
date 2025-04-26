import express from 'express';
import { login, register, verifyToken } from '../controllers/authController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route for token verification
router.get('/verify', auth, verifyToken);

export default router;
