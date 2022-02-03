const express = require('express');
const router = express.Router();
const { spendPoints, isValidUserBalance } = require('./SpendService');


router.patch('/api/user/spend', async (req, res, next) => {
  try {
    let pointsToSpend = req.body.points;

    /**handle cases where user has no points/transactions
     * or doesn't have enough points for the spend call
     */
    const validUserBalance = await isValidUserBalance(pointsToSpend);
    if (validUserBalance !== true) {
      return res.json(validUserBalance);
    }

    /**can proceed to spend points as normal**/
    const payerList = await spendPoints(pointsToSpend);

    res.status(200).send(payerList)

  } catch (err) {
    next(err);
  }
})


// router.get('/api/', async (req, res, next) => {
//   try {

//   } catch (err) {
//     next(err);
//   }
// })




module.exports = router;
