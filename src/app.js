const express = require('express');
const app = express();
const PayerRouter = require('./routes/PayerRouter');
const SpendRouter = require('./routes/SpendRouter');
// const PointsRouter = require('./routes');


app.use(express.json());

// app.use('/', PointsRouter);
app.use(PayerRouter);
app.use(SpendRouter);
// app.use('/api/transactions', PayerRouter);
// app.use('/api/user/spend', require('./routes/SpendRouter'));

module.exports = app;
