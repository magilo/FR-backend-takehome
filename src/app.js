const express = require('express');
const app = express();
const TransactionRouter = require('./routes/TransactionRouter');
const SpendRouter = require('./routes/SpendRouter');
// const PointsRouter = require('./routes');


app.use(express.json());

// app.use('/', PointsRouter);
app.use(TransactionRouter);
app.use(SpendRouter);
// app.use('/api/transactions', TransactionRouter);
// app.use('/api/user/spend', require('./routes/SpendRouter'));

module.exports = app;
