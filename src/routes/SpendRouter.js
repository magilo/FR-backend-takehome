const express = require('express');
const router = express.Router();

const { Partner, Transaction } = require('../models');
const sequelize = require('../database');
const { Op } = require("sequelize");
const { spendPoints } = require('./SpendService');


router.patch('/api/user/spend', async (req, res, next) => {
  try {

    let pointsToSpend = req.body.points;

    /**grab transactions in timestamp order where there are leftover points**/
    const orderByTimestamp = await Transaction.findAll({
      where: {
        leftover: {
          [Op.ne]: 0,
        }
      },
      order: sequelize.col('timestamp')
    })

    const userBalance = await Partner.sum('points');

    /**handle cases where user has no points/transactions
     * or doesn't have enough points for the spend call
     */
    if (userBalance === null) {
      return res.json(
        {
          message: "no points available",
          balance: 0
        })
    } else if (userBalance < pointsToSpend) {
      return res.json(
        {
          message: "not enough points",
          balance: userBalance
        });
    }

    /**can proceed to spend points as normal**/
    const payerList = await spendPoints(orderByTimestamp, pointsToSpend);

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
