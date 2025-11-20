import cors from 'cors';
import express from 'express';
const app = express();
import {connectDB} from './config/database.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

