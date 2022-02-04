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


const transactions = [
  { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
  { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
  { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
  { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
  { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
];

const singleTransaction = (transaction) => {
  const payerName = transaction.payer
  const agent = request(app).put(`/api/transactions/${payerName}`);
  return agent.send(transaction);
}

async function putTransactions(transactions) {
  for (const transaction of transactions) {
    const t = await singleTransaction(transaction)
  }
}

const getPointsBalance = () => {
  const agent = request(app).get('/api/user/balance');
  return agent.send()
}

const patchSpendPoints = (spent) => {
  const agent = request(app).patch('/api/user/spend');
  return agent.send(spent)
};

describe('get payer points balance', () => {
  it('returns a list of objects', async () => {
    await singleTransaction({ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" })
    const res = await getPointsBalance();

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toMatchObject({ "payer": "DANNON", "points": 300 });
  })

  it('returns all payers and their current balance', async () => {
    await putTransactions(transactions);
    const res = await getPointsBalance();

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
    expect(res.body[0]).toMatchObject({ "payer": "DANNON", "points": 1100 });
    expect(res.body[1]).toMatchObject({ "payer": "UNILEVER", "points": 200 });
    expect(res.body[2]).toMatchObject({ "payer": "MILLER COORS", "points": 10000 });
  })

  it('returns new balances if points were spent', async () => {
    await putTransactions(transactions);
    await patchSpendPoints({ "points": 5000 });
    const res = await getPointsBalance();

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
    expect(res.body[0]).toMatchObject({ "payer": "DANNON", "points": 1000 });
    expect(res.body[1]).toMatchObject({ "payer": "UNILEVER", "points": 0 });
    expect(res.body[2]).toMatchObject({ "payer": "MILLER COORS", "points": 5300 });
  })

  it('returns empty list if there are no payers', async () => {
    const res = await getPointsBalance();

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  })
})
