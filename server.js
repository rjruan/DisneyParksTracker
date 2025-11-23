import cors from 'cors';
import express from 'express';
const app = express();
import {connectDB} from './config/database.js';
import routes from './routes/index.js';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const start = async () => {
    await connectDB();
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
    app.use('/', routes);
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}
start();