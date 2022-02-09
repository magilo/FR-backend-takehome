const express = require('express');
const router = express.Router();
const { spendPoints, isValidUserBalance } = require('./SpendService');



/**
 * @swagger
 * /api/user/spend:
 *   patch:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
 */
router.patch('/api/user/spend', async (req, res, next) => {
  try {
    let pointsToSpend = req.body.points;

    const validUserBalance = await isValidUserBalance(pointsToSpend);
    if (validUserBalance !== true) {
      return res.json(validUserBalance);
    }

    /**if balance is valid, can proceed to spend points as normal**/
    const payerList = await spendPoints(pointsToSpend);

    res.status(200).send(payerList)

  } catch (err) {
    next(err);
  }
})


module.exports = router;
