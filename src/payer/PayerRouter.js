const express = require('express');
const router = express.Router();

const Transaction = require('../transaction/Transaction');
const Payer = require('./Payer');
const sequelize = require('../database');

/*** API routes for payer*/


router.put('/api/transactions/:payer', async (req, res, next) => {
  try {
    //add new row to transactions table
    await Transaction.create({
      payer: req.body.payer,
      points: req.body.points,
      timestamp: req.body.timestamp,
      leftover: req.body.points
    })

    //create or update payer points
    const requestedPayer = req.params.payer;
    const payer = await Payer.findOne({ where: { payer: requestedPayer } })
    if (payer === null) {
      await Payer.create({
        payer: req.body.payer,
        points: req.body.points,
      })
      res.json({ message: "new payer added" })
    } else {
      payer.points += req.body.points;
      await payer.save();
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
