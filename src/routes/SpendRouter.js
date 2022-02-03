const express = require('express');
const router = express.Router();

const { Partner, Transaction } = require('../models');
const sequelize = require('../database');
const { Op } = require("sequelize");


router.patch('/api/user/spend', async (req, res, next) => {
  try {

    let pointsToSpend = req.body.points;
    //also where leftover doesn't occur
    // const orderByTimestamp = await Transaction.findAll({
    //   order: sequelize.col('timestamp')
    // })
    const orderByTimestamp = await Transaction.findAll({
      where: {
        leftover: {
          [Op.ne]: 0,
        }
      },
      order: sequelize.col('timestamp')
    })
    console.log('orderByTimestamp', orderByTimestamp)

    const userBalance = await Partner.sum('points');
    console.log('userBalance', userBalance)

    if (orderByTimestamp.length > 0) {

      const activePayers = {}







      let paidList = []
      for (let payerName in activePayers) {
        const paidAmount = { payer: payerName, points: activePayers[payerName] }
        paidList.push(paidAmount);
      }

      res.status(200).send(paidList)
      // .json({ message: "points have been spent" })

    } else {
      res.json({ message: "no points available" })
    }

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
