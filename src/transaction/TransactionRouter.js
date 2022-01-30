const express = require('express');
const router = express.Router();

const Transaction = require('./Transaction')


/*** API routes for transactions*/
router.post('/api/transactions', async (req, res, next) => {
  try {
    //create new row in transaction table

    console.log(req.body)
    await Transaction.create({
      payer: req.body.payer,
      points: req.body.points,
      timestamp: req.body.timestamp,
      spent: false
    })

    res.json({ message: "transaction added" })

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
