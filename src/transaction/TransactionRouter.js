const express = require('express');
const router = express.Router();

const Transaction = require('../models/Transaction');
const sequelize = require('../database');

/*** API routes for transactions*/
router.post('/api/transactions', async (req, res, next) => {
  try {
    //create new row in transaction table

    // console.log(req.body)
    await Transaction.create({
      payer: req.body.payer,
      points: req.body.points,
      timestamp: req.body.timestamp,
      leftover: req.body.points
    })

    res.json({ message: "transaction added" })

  } catch (err) {
    next(err);
  }
})

router.get('/api/transactions', async (req, res, next) => {
  try {
    const transactionList = await Transaction.findAll({
      order: sequelize.col('timestamp')
    });
    // console.log(transactionList.length, transactionList[0].timestamp);
    res.json(transactionList);
  } catch (err) {
    next(err);
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router;
