const express = require('express');
const router = express.Router();

const { Partner } = require('../models');



/**
 * @swagger
 * /hello:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
 */

router.get('/hello', (req, res) => {
  res.send('Hello World (Version 2)!');
});

/**
 * @swagger
 * /api/user/balance:
 *   get:
 *     summary: Gets a list of payers and their points balance.
 *     description: A user's balance is made up of the points balance from the partners that they had a transaction with.
 *     responses:
 *       200:
 *         description: OK
 */


router.get('/api/user/balance', async (req, res, next) => {
  try {
    const pointsBalance = await Partner.findAll({
      attributes: ['payer', 'points']
    });

    res.json(pointsBalance);
  } catch (err) {
    next(err);
  }
})


module.exports = router;
