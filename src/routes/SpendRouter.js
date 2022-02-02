const express = require('express');
const router = express.Router();

const { Partner, Transaction } = require('../models');
const sequelize = require('../database');


router.patch('/api/user/spend', async (req, res, next) => {
  try {

    const orderByTimestamp = await Transaction.findAll({
      order: sequelize.col('timestamp')
    })

    // const payerData = await Payer.findAll //find by name
    //in timestamp order, start querying payers from Partner table
    //subtract the used points per payer
    const activePayers = new Set(); //stores payers that were already queried
    const payerPointsSpent = {};

    let pointsToSpend = req.body.points;
    console.log(pointsToSpend);

    res.json({ message: "points have been spent" })
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


// router.use((req, res, next) => {
//   const error = new Error('Not Found')
//   error.status = 404
//   next(error)
// })

module.exports = router;
