import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Disney Parks Tracker API',
        description: 'API for tracking Disney park rides and wait times',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen()(outputFile, routes, doc)