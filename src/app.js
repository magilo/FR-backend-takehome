const express = require('express');
const app = express();
const Routers = require('./routes')

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('../docs/options');

/* express middleware */
app.use(express.json());

/* get all routes from the routes index file */
app.use(Routers)

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//send 404 for any remaining requests
app.use((req, res, next) => {
  const error = new Error('404 Not Found')
  error.status = 404
  next(error)
})


module.exports = app;
