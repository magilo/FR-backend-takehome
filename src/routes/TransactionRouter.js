const express = require('express');
const router = express.Router();

const { addTransaction, getTransactions } = require('./TransactionService');


router.put('/api/transactions/:payer', async (req, res, next) => {
  try {
    const transaction = await addTransaction(req.body, req.params.payer);
    res.json(transaction);

  } catch (err) {
    next(err);
  }
})


router.get('/api/transactions', async (req, res, next) => {
  try {
    const transactionList = await getTransactions();
    res.json(transactionList);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
