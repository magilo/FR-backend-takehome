
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

const dannon1 = { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" };
const unilever = { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" };
const dannon2 = { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" };

const singleTransaction = (transaction) => {
  const payerName = transaction.payer
  const agent = request(app).put(`/api/transactions/${payerName}`);
  return agent.send(transaction);
}

const getTransactions = () => {
  return request(app).get('/api/transactions');
}


describe('add transaction route', () => {
  it('creates new payer if payer does not exist in Partner table', async () => {
    const response = await singleTransaction(dannon1);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('new payer added');
  })

  it('updates payer points if payer already exists', async () => {
    await singleTransaction(dannon1);
    await singleTransaction(unilever);
    const response = await singleTransaction(dannon2);
    const updatedPayer = await Partner.findOne({ where: { payer: "DANNON" } })

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('points updated');
    expect(updatedPayer.points).toBe(800);
  })

  it('adds transactions to the transaction table', async () => {
    await Promise.all([
      singleTransaction(dannon1),
      singleTransaction(dannon2)
    ]);
    const transactionList = await Transaction.findAll();

    expect(transactionList.length).toBe(2);
  })

  it('saves the payer, points, timestamp to the transactions table', async () => {
    await singleTransaction(dannon1);
    const transactionList = await Transaction.findAll();
    const savedTransaction = transactionList[0];

    expect(savedTransaction.payer).toBe('DANNON');
    expect(savedTransaction.points).toBe(1000);
    expect(savedTransaction.timestamp).toBe("2020-11-02T14:00:00Z");
    expect(savedTransaction.leftover).toBe(1000);
  })

});

describe('get transactions', () => {
  it('returns a list of rows from the transaction table', async () => {
    await Promise.all([
      singleTransaction(dannon1),
      singleTransaction(dannon2),
      singleTransaction(unilever)
    ]);

    const res = await getTransactions();

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  })

  it('returns empty list if there are no transactions', async () => {
    const res = await getTransactions();

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  })

})




