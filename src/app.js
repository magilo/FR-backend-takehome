const express = require('express');
const app = express();
const Routers = require('./routes')

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MG Rewards API project',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000/'
      }
    ]
  },
  apis: ['./app.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

/* get all routes from the routes index file */
app.use(Routers)

module.exports = app;
