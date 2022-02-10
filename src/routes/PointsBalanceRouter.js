const express = require('express');
const router = express.Router();

const { Partner } = require('../models');


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
