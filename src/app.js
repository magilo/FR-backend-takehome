const express = require('express');
const app = express();
// const TransactionRouter = require('./transaction/TransactionRouter');
const PayerRouter = require('./payer/PayerRouter');

app.use(express.json());

// app.use(TransactionRouter);
app.use(PayerRouter);

module.exports = app;
