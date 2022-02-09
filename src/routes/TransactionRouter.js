const express = require('express');
const router = express.Router();

const { addTransaction, getTransactions } = require('./TransactionService');


/**
 * @swagger
 * /api/transactions/{payer}:
 *   put:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
 */
router.put('/api/transactions/:payer', async (req, res, next) => {
  try {
    const transaction = await addTransaction(req.body, req.params.payer);
    res.json(transaction);

  } catch (err) {
    next(err);
  }
})

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Gets a list of transactions from database.
 *     description: A row from the transactions table contains payerName, points, timestamp, and leftover points.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   payer:
 *                     type: string
 *                     description: The payer name.
 *                     example: DANNON
 *                   points:
 *                     type: integer
 *                     example: 300
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: 2020-10-31T10:00:00Z
 *                   leftover:
 *                     type: integer
 *                     example: 150
 */



router.get('/api/transactions', async (req, res, next) => {
  try {
    const transactionList = await getTransactions();
    res.json(transactionList);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
