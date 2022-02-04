const express = require('express');
const router = express.Router();

const { Partner, Transaction } = require('../models');

router.get('/api/user/balance', async (req, res, next) => {
  try {
    const pointsBalance = await Partner.findAll({
      attributes: ['payer', 'points']
    });
    console.log(pointsBalance)
    res.json(pointsBalance);

  } catch (err) {
    next(err);
  }
})


module.exports = router;
