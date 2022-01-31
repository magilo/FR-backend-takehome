const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/database');
const Partner = require('../src/models/Partner');
const Transaction = require('../src/models/Transaction');

beforeAll(() => {
  return sequelize.sync();
});

//clean tables before each it block
beforeEach(async () => {
  await Partner.destroy({ truncate: true });
  await Transaction.destroy({ truncate: true });
})
