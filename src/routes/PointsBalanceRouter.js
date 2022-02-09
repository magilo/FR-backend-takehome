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
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
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
