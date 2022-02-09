const express = require('express');
const router = express.Router();

const TransactionRouter = require('./TransactionRouter');
const SpendRouter = require('./SpendRouter');
const PointsBalanceRouter = require('./PointsBalanceRouter');


router.use(TransactionRouter);
router.use(SpendRouter);
router.use(PointsBalanceRouter);

module.exports = router;


