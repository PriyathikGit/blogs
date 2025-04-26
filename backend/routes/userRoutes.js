import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import role from '../middlewares/role.js';

// Public routes
// (None for users)

// Authenticated routes
router.get('/me', auth, userController.getCurrentUser);
router.put('/me', auth, userController.updateUser);

// Admin-only routes
router.get('/', auth, role('admin'), userController.getAllUsers);
router.get('/:id', auth, role('admin'), userController.getUserById);
router.put('/:id/role', auth, role('admin'), userController.updateUserRole);
router.delete('/:id', auth, userController.deleteUser); // Note: User can delete themselves or admin can delete

export default router