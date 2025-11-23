import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();


const doc = {
    info: {
        title: 'Disney Parks Tracker API',
        description: 'API for tracking Disney park rides and wait times',
    },
    host: `${process.env.BASE_URL}:${process.env.PORT}`,
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen()(outputFile, routes, doc)