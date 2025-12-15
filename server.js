import cors from 'cors';
import express from 'express';
const app = express();
import {connectDB} from './config/database.js';
import { router } from './routes/index.js';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };
import { auth } from 'express-openid-connect';
import AppError from './errors/AppError.js';
import errorHandler from './middleware/errorHandler.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

const start = async () => {
    await connectDB();
    app.use(auth(config));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
    app.use('/', router);

    app.use((req, res, next) => {
        next(new AppError('Route not found', 404));
    });

    app.use(errorHandler);

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}

start();