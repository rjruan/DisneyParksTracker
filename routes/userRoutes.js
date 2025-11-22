import express from 'express';
const router = express.Router();
import { getUsers, getUserByUsername, createUser, updateUser, deleteUser } from '../controllers/userController.js';

router.get('/', getUsers);
router.get('/:username', getUserByUsername);
router.post('/', createUser);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

export default router;