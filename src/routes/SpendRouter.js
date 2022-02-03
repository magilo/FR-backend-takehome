const express = require('express');
const router = express.Router();

const { Partner, Transaction } = require('../models');
const sequelize = require('../database');
const { Op } = require("sequelize");


router.patch('/api/user/spend', async (req, res, next) => {
  try {

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

    if (orderByTimestamp.length > 0) {

      const activePayers = {}


      let pointsToSpend = req.body.points;
      let timestampIdx = 0; //index for orderByTimestamp

      while (pointsToSpend > 0) {
        const currentTransaction = orderByTimestamp[timestampIdx];
        let transactionPoints = orderByTimestamp[timestampIdx].points;
        let currentPayer = orderByTimestamp[timestampIdx].payer;
        let leftover = orderByTimestamp[timestampIdx].leftover;
        //check that the Payer still has points to use
        const payerBalance = await Partner.findOne({ where: { payer: currentPayer } })

        //if not in activePayers, add it anyways
        if (!(currentPayer in activePayers)) activePayers[currentPayer] = 0;

        if (payerBalance.points >= currentTransaction.leftover || payerBalance.points >= pointsToSpend) {
          console.log('transactionPoints', transactionPoints, pointsToSpend);

          if (pointsToSpend <= currentTransaction.leftover) {
            console.log('inside if block if there are leftover points')
            //either there will be leftover points in this transaction
            //or uses up all the leftover points
            //the amount of pointsToSpend will be the entire value
            currentTransaction.leftover -= pointsToSpend; //update leftover col for transaction
            // await orderByTimestamp[timestampIdx].save();
            await currentTransaction.save();

            activePayers[currentPayer] -= pointsToSpend; //update activePayers{} with paid points

            payerBalance.points -= pointsToSpend; //update points col for Partner
            await payerBalance.save();

            pointsToSpend -= pointsToSpend; //will be 0 to break loop

            console.log('activePayers', activePayers)
            console.log('payerBalance', payerBalance)
            console.log('leftover points', currentTransaction.leftover)
            console.log('pointsToSpend', pointsToSpend)

          } else if (currentTransaction.leftover > pointsToSpend) {
            console.log('inside the else block')
            activePayers[currentPayer] -= transactionPoints;
            payerBalance.points = payerBalance.points - transactionPoints;
            await payerBalance.save();

            // if points are fully used,
            // set leftover to 0 so that it won't be queried again
            currentTransaction.leftover -= transactionPoints;
            await currentTransaction.save();

            pointsToSpend -= transactionPoints;
            console.log('activePayers', activePayers)
            console.log('payerBalance', payerBalance)
            console.log('leftover points', currentTransaction.leftover)
            console.log('pointsToSpend', pointsToSpend)

          }
        }

        // if (currentTransaction <= pointsToSpend) {
        //   //so that it doesn't go into negative
        // }
        // pointsToSpend -= currentTransaction;
        //update "leftover"
        timestampIdx++;
        // break;
      }

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
