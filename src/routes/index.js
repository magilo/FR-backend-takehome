const express = require('express');

const PayerRouter = require('../payer/PayerRouter');
const SpendRouter = require('./SpendRouter');

const router = express.Router();

router.use(PayerRouter);
router.use(SpendRouter);

module.exports = router;
// export { router as PointsRouter };
