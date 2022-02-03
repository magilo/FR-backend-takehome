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

    if (userBalance === null) {
      // console.log(userBalance, pointsToSpend)
      return res.json(
        {
          message: "no points available",
          balance: 0
        })
    } else if (userBalance < pointsToSpend) {
      // console.log(userBalance, pointsToSpend)
      return res.json(
        {
          message: "not enough points",
          balance: userBalance
        });
    }

    let timestampIdx = 0; //index for orderByTimestamp
    while (pointsToSpend > 0) {
      let currentTransaction = orderByTimestamp[timestampIdx];
      let currentPayer = currentTransaction.payer;

      const payerBalance = await Partner.findOne({ where: { payer: currentPayer } })

      //first use up any leftover points in the currentTransaction
      // then go through each transaction until pointsToSpend is paid out
      if (currentTransaction.leftover >= pointsToSpend) {
        //this means that points to spend will go to 0
        //there may or may not be leftover points

        payerBalance.points -= pointsToSpend;
        await payerBalance.save();

        currentTransaction.leftover -= pointsToSpend;
        await currentTransaction.save();

        pointsToSpend -= pointsToSpend; //0
      }
      else if (currentTransaction.leftover < pointsToSpend) {
        //this means it will use up all of the points in the currentTransaction
        //there will still be pointsToSpend after this

        payerBalance.points -= currentTransaction.leftover;
        await payerBalance.save();

        pointsToSpend -= currentTransaction.leftover

        currentTransaction.leftover = 0;
        await currentTransaction.save();
      }

      console.log('payerBalance', payerBalance)
      console.log('leftover points', currentTransaction.leftover)
      console.log('pointsToSpend', pointsToSpend)

      break;
    }


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
