const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books API',
        description: 'Books API'
    },
    host: 'localhost:3001',
    schemes: ['http', 'https'] 
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

// This will generate swagger.json 
swaggerAutogen(outputFile, endpointsFile, doc);
