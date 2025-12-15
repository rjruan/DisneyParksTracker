import express from 'express';
const router = express.Router();
import { getUsers, getUserByUsername, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { requiresAuth } from 'express-openid-connect';

router.get('/', getUsers);
router.get('/:username', getUserByUsername);
router.post('/', createUser);
router.put('/:username', requiresAuth(), updateUser);
router.delete('/:username', requiresAuth(), deleteUser);

export default router;