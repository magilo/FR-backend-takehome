const { Partner, Transaction } = require('../models');

const addTransaction = async (body, payerName) => {

  const transaction = await Transaction.create({
    payer: body.payer,
    points: body.points,
    timestamp: body.timestamp,
    leftover: body.points
  })

  /* create or update payer points */
  const payer = await Partner.findOne({ where: { payer: payerName } })
  if (payer === null) {
    await Partner.create({
      payer: body.payer,
      points: body.points,
    })
    const newPayer = await Partner.findOne({ where: { payer: payerName } })
    await transaction.setPartner(newPayer);
    return { message: "new payer added" };
  } else {
    payer.points += body.points;
    await payer.save();
    await transaction.setPartner(payer);
    return { message: "points updated" };
  }
}

const getTransactions = async () => {
  return await Transaction.findAll({
    attributes: ['payer', 'points', 'timestamp', 'leftover']
  });
}


module.exports = {
  addTransaction,
  getTransactions
};
