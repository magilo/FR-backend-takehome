const express = require('express');
const app = express();
const TransactionRouter = require('./routes/TransactionRouter');
const SpendRouter = require('./routes/SpendRouter');


app.use(express.json());

app.use(TransactionRouter);
app.use(SpendRouter);

module.exports = app;
