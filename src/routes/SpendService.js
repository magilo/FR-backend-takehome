const { Partner, Transaction } = require('../models');
const sequelize = require('../database');
const { Op } = require("sequelize");

const spendPoints = async (orderByTimestamp, pointsToSpend) => {

  const activePayers = {} //payers that paid out for this spend call
  let timestampIdx = 0; //index for orderByTimestamp

  while (pointsToSpend > 0) {
    let currentTransaction = orderByTimestamp[timestampIdx];
    let currentPayer = currentTransaction.payer;

    const payerBalance = await Partner.findOne({ where: { payer: currentPayer } })
    //initialize payer in activePayers
    if (!(currentPayer in activePayers)) activePayers[currentPayer] = 0;

    //first use up any leftover points in the currentTransaction
    // then go through each transaction until pointsToSpend is paid out
    if (currentTransaction.leftover >= pointsToSpend) {
      //this means that points to spend will go to 0
      //there may or may not be leftover points
      activePayers[currentPayer] -= pointsToSpend;

      payerBalance.points -= pointsToSpend;
      await payerBalance.save();

      currentTransaction.leftover -= pointsToSpend;
      await currentTransaction.save();

      pointsToSpend -= pointsToSpend; //0
    }
    else if (currentTransaction.leftover < pointsToSpend) {
      //this means it will use up all of the points in the currentTransaction
      //there will still be pointsToSpend after this
      activePayers[currentPayer] -= currentTransaction.leftover;

      payerBalance.points -= currentTransaction.leftover;
      await payerBalance.save();

      pointsToSpend -= currentTransaction.leftover

      currentTransaction.leftover = 0;
      await currentTransaction.save();
    }

    // console.log('payerBalance', payerBalance)
    // console.log('leftover points', currentTransaction.leftover)
    // console.log('pointsToSpend', pointsToSpend)

    timestampIdx++;
  }

  let paidList = []
  for (let payerName in activePayers) {
    const paidAmount = { payer: payerName, points: activePayers[payerName] }
    paidList.push(paidAmount);
  }

  return paidList;
}


module.exports = {
  spendPoints
}
