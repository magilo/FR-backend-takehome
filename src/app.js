const express = require('express');
const app = express();
const TransactionRouter = require('./transaction/TransactionRouter');

app.use(express.json());

app.use(TransactionRouter);

module.exports = app;
