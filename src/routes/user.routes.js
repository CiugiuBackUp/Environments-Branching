import { createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/user.controller.js';
import { Router } from 'express';
const router = Router();

router.post('/users', createUserController);
router.get('/users', getAllUsersController);
router.get('/users/:id', getUserByIdController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

export default router;
