const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/database');
const Payer = require('../src/payer/Payer');
const Transaction = require('../src/transaction/Transaction');

beforeAll(() => {
  return sequelize.sync();
});

//clean tables before each it block
beforeEach(async () => {
  await Payer.destroy({ truncate: true });
  await Transaction.destroy({ truncate: true });
})
