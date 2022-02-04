const express = require('express');
const router = express.Router();

const { addTransaction } = require('./TransactionService');


router.put('/api/transactions/:payer', async (req, res, next) => {
  try {
    const transaction = await addTransaction(req.body, req.params.payer);
    res.json(transaction);

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
