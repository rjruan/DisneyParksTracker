import cors from 'cors';
import express from 'express';
const app = express();
import {connectDB} from './config/database.js';
import routes from './routes/index.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const start = async () => {
    await connectDB();
    app.use('/', routes);
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}
start();