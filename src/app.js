const express = require('express');
const app = express();
const Routers = require('./routes')

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/* express middleware */
app.use(express.json());

/* get all routes from the routes index file */
app.use(Routers)

/* options for swaggerJSDoc */
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

//send 404 for any remaining requests
app.use((req, res, next) => {
  const error = new Error('404 Not Found')
  error.status = 404
  next(error)
})

// // error handling endware
// app.use((err, req, res, next) => {
//   console.error(err)
//   console.error(err.stack)
//   res.status(err.status || 500).send(err.message || 'Internal server error.')
// })




module.exports = app;
