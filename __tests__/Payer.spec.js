
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


const putTransaction1 = () => {
  return request(app)
    .put('/api/transactions/DANNON')
    .send({
      "payer": "DANNON",
      "points": 1000,
      "timestamp": "2020-11-02T14:00:00Z"
    })
}

const putTransaction2 = () => {
  return request(app)
    .put('/api/transactions/UNILEVER')
    .send({
      "payer": "UNILEVER",
      "points": 200,
      "timestamp": "2020-10-31T11:00:00Z"
    })
}

const putTransaction3 = () => {
  return request(app)
    .put('/api/transactions/DANNON')
    .send({
      "payer": "DANNON",
      "points": -200,
      "timestamp": "2020-10-31T15:00:00Z"
    })
}

it('creates new payer if payer does not exist in table', async () => {
  const response = await putTransaction1();
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('new payer added');
})


it('updates payer points if payer already exists', async () => {
  // const response = await Promise.all([
  //   putTransaction1(),
  //   putTransaction3()
  // ]);

  await putTransaction1();
  await putTransaction2();
  const response = await putTransaction3();

  console.log('response', response.body)
  const updatedPayer = await Partner.findOne({ where: { payer: "DANNON" } })

  expect(response.status).toBe(200);
  expect(response.body.message).toBe('points updated');
  expect(updatedPayer.points).toBe(800);
})

it('adds transactions to the transaction table', async () => {
  await Promise.all([
    putTransaction1(),
    putTransaction3()
  ]);

  const transactionList = await Transaction.findAll();
  expect(transactionList.length).toBe(2);
})

it('saves the payer, points, timestamp to the transactions table', async () => {
  await putTransaction1();
  const transactionList = await Transaction.findAll();
  const savedTransaction = transactionList[0];
  expect(savedTransaction.payer).toBe('DANNON');
  expect(savedTransaction.points).toBe(1000);
  expect(savedTransaction.timestamp).toBe("2020-11-02T14:00:00Z");
  expect(savedTransaction.leftover).toBe(1000);
})

