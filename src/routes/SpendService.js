const { Partner, Transaction } = require('../models');
const sequelize = require('../database');
const { Op } = require("sequelize");

/** isValidUserBalance takes care of any cases where
 * user has no points/transactions
 * doesn't have enough points for the spend call */
const isValidUserBalance = async (pointsToSpend) => {
  const userBalance = await Partner.sum('points');
  if (userBalance === null) {
    return {
      message: "no points available",
      balance: 0
    };
  } else if (userBalance < pointsToSpend) {
    return {
      message: "not enough points",
      balance: userBalance
    };
  }
  return true;
}


/**spendPoints function updates leftover points in Transaction,
 * updates payer balance in Partner,
 * and returns a list of the payers from current spend call  */
const spendPoints = async (pointsToSpend) => {

  /**grab transactions in timestamp order where there are leftover points**/
  const orderByTimestamp = await Transaction.findAll({
    where: {
      leftover: {
        [Op.ne]: 0,
      }
    },
    order: sequelize.col('timestamp')
  })

  const activePayers = {} //payers that paid out for this spend call
  let timestampIdx = 0; //index for orderByTimestamp

  //first use up any leftover points in the currentTransaction
  // then go through each transaction until pointsToSpend is paid out
  while (pointsToSpend > 0) {
    let currentTransaction = orderByTimestamp[timestampIdx];
    let currentPayer = currentTransaction.payer;

    const payerBalance = await Partner.findOne({ where: { payer: currentPayer } })

    if (!(currentPayer in activePayers)) activePayers[currentPayer] = 0;

    if (currentTransaction.leftover >= pointsToSpend) {
      //cases where points to spend will go to 0
      //there may or may not be leftover points
      activePayers[currentPayer] -= pointsToSpend;

      payerBalance.points -= pointsToSpend;
      await payerBalance.save();

      currentTransaction.leftover -= pointsToSpend;
      await currentTransaction.save();

      pointsToSpend -= pointsToSpend; //0
    }
    else if (currentTransaction.leftover < pointsToSpend) {
      //cases where it will use up all of the points in the currentTransaction
      //there will still be pointsToSpend after this
      activePayers[currentPayer] -= currentTransaction.leftover;

      payerBalance.points -= currentTransaction.leftover;
      await payerBalance.save();

      pointsToSpend -= currentTransaction.leftover

      currentTransaction.leftover = 0;
      await currentTransaction.save();
    }

    timestampIdx++;
  };

  let paidList = []
  for (let payerName in activePayers) {
    const paidAmount = { payer: payerName, points: activePayers[payerName] }
    paidList.push(paidAmount);
  }

  return paidList;
}


module.exports = {
  spendPoints,
  isValidUserBalance
}
