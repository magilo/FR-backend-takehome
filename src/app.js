const express = require('express');
const app = express();
const Routers = require('./routes')

app.use(express.json());

/* get all routes from the routes index file */
app.use(Routers)

module.exports = app;
