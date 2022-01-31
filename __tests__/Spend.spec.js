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

const pointsSpend = { "points": 5000 };

const patchPointsSpend1 = (spent = pointsSpend) => {
  const agent = request(app).patch('/api/user/spend');
  return agent.send(spent)
}

// const putTransaction3 = () => {
//   return request(app)
//     .put('/api/transactions/DANNON')
//     .send({
//       "payer": "DANNON",
//       "points": -200,
//       "timestamp": "2020-10-31T15:00:00Z"
//     })
// }

it('returns success message if request is valid', async () => {
  const response = await patchPointsSpend1();
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('points have been spent');
})
