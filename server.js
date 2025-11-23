import cors from 'cors';
import express from 'express';
const app = express();
import {connectDB} from './config/database.js';
import routes from './routes/index.js';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const start = async () => {
    await connectDB();
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
    app.use('/', routes);
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}
start();