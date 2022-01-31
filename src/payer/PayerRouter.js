const express = require('express');
const router = express.Router();

const { Partner, Transaction } = require('../models');
// const Transaction = require('../models/Transaction');
// const Payer = require('../models/Payer');
const sequelize = require('../database');

/*** API routes for payer*/


router.put('/api/transactions/:payer', async (req, res, next) => {
  try {
    //add new row to transactions table
    const transaction = await Transaction.create({
      payer: req.body.payer,
      points: req.body.points,
      timestamp: req.body.timestamp,
      leftover: req.body.points
    })

    //create or update payer points
    const payer = await Partner.findOne({ where: { payer: req.params.payer } })
    // console.log(payer);
    if (payer === null) {
      await Partner.create({
        payer: req.body.payer,
        points: req.body.points,
      })
      const newPayer = await Partner.findOne({ where: { payer: req.params.payer } })
      await transaction.setPartner(newPayer);
      res.json({ message: "new payer added" })
    } else {
      payer.points += req.body.points;
      await payer.save();
      await transaction.setPartner(payer);
      res.json({ message: "points updated" })
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

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router;
