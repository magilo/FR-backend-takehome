const express = require('express');
const app = express();
const TransactionRouter = require('./routes/TransactionRouter');
const SpendRouter = require('./routes/SpendRouter');
const PointsBalanceRouter = require('./routes/PointsBalanceRouter');

app.use(express.json());

app.use(TransactionRouter);
app.use(SpendRouter);
app.use(PointsBalanceRouter);

module.exports = app;
