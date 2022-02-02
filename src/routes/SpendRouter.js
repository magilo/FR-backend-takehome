const express = require('express');
const router = express.Router();

const { Partner, Transaction } = require('../models');
const sequelize = require('../database');


router.patch('/api/user/spend', async (req, res, next) => {
  try {

    //also where leftover doesn't occur
    const orderByTimestamp = await Transaction.findAll({
      order: sequelize.col('timestamp')
    })

    if (orderByTimestamp.length > 0) {
      // const payerData = await Payer.findAll //find by name
      //in timestamp order, start querying payers from Partner table
      //subtract the used points per payer
      // const activePayers = new Set(); //stores payers that were already queried
      // const payerPointsSpent = {};

      const activePayers = {}


      let pointsToSpend = req.body.points;

      let timestampIdx = 0; //index for orderByTimestamp
      while (pointsToSpend > 0 && orderByTimestamp.length > 0) {

        let transactionPoints = orderByTimestamp[timestampIdx].points;
        let currentPayer = orderByTimestamp[timestampIdx].payer;
        let leftover = orderByTimestamp[timestampIdx].leftover;
        //check that the Payer still has points to use
        const payerBalance = await Partner.findOne({ where: { payer: currentPayer } })

        //if not in activePayers, add it anyways
        if (!(currentPayer in activePayers)) activePayers[currentPayer] = 0;
        console.log('transactionPoints', transactionPoints);

        if (payerBalance.points >= transactionPoints) {
          console.log('inside the if block')
          activePayers[currentPayer] -= transactionPoints;
          payerBalance.points = payerBalance.points - transactionPoints;
          await payerBalance.save();
          leftover -= transactionPoints;
          await orderByTimestamp[timestampIdx].save();
          console.log('activePayers', activePayers)
          console.log('payerBalance', payerBalance)
          console.log('leftover points', leftover)
        }
        // if (currentTransaction <= pointsToSpend) {
        //   //so that it doesn't go into negative
        // }
        // pointsToSpend -= currentTransaction;
        //update "leftover"
        break;
      }

      let paidList = []
      for (let payerName in activePayers){
        const paidAmount = {payer: payerName, points: activePayers[payerName]}
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
