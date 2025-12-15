import express from 'express';
const router = express.Router();
import reviewRoutes from './reviewRoutes.js';
import userRoutes from './userRoutes.js';
import rideRoutes from './rideRoutes.js';
import parkRoutes from './parkRoutes.js';

import pkg from 'express-openid-connect';
const {auth, requiresAuth} = pkg;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
}

router.use(auth(config));

router.use('/rides', rideRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);
router.use('/parks', parkRoutes);
router.get('/callback', (req, res) => {
    res.redirect('/api-docs');
});

export {router, requiresAuth};
