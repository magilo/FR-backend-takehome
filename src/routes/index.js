const express = require('express');

const TransactionRouter = require('./TransactionRouter');
const SpendRouter = require('./SpendRouter');

const router = express.Router();

router.use(TransactionRouter);
router.use(SpendRouter);

module.exports = router;
// export { router as PointsRouter };


// router.use((req, res, next) => {
//   const error = new Error('Not Found')
//   error.status = 404
//   next(error)
// })
