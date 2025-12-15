import express from 'express';
const router = express.Router();
import { getUsers, getUserByUsername, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import pkg from 'express-openid-connect';
const {auth, requiresAuth} = pkg;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    routes: {
        login: '/authorize',
        callback: '/callback',
        logout: '/logout'
    }
}

router.use(auth(config));

router.get('/', getUsers);
router.get('/:username', getUserByUsername);
router.post('/', createUser);
router.put('/:username', requiresAuth(), updateUser);
router.delete('/:username', requiresAuth(), deleteUser);

export default router;