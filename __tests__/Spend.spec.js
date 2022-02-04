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

const patchSpendPoints = (spent) => {
  const agent = request(app).patch('/api/user/spend');
  return agent.send(spent)
};

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

describe('spend points', () => {
  it('returns status OK, message, and balance if request is valid', async () => {
    const res = await patchSpendPoints({ "points": 5000 });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("no points available");
    expect(res.body.balance).toBe(0);
  });

  it('returns with message and balance if user does not have enough points for the spend request', async () => {
    await singleTransaction({ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" });
    const res = await patchSpendPoints({ "points": 5000 });

    expect(res.body.message).toBe("not enough points");
    expect(res.body.balance).toBe(300);
  });

  it('returns with message and balance if user has no points', async () => {
    const res = await patchSpendPoints({ "points": 0 });

    expect(res.body.message).toBe("no points available");
    expect(res.body.balance).toBe(0);
  });

  it('responds with how many points the payer paid', async () => {
    await singleTransaction({ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" });
    const res = await patchSpendPoints({ "points": 300 });

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);

    expect(res.body[0].payer).toBe("DANNON");
    expect(res.body[0].points).toBe(-300);
    expect(res.status).toBe(200);
  });

  it('handles cases where there will be leftover points in the transaction', async () => {
    await singleTransaction({ "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" });
    const res = await patchSpendPoints({ "points": 5000 });

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);

    expect(res.body[0].payer).toBe("MILLER COORS");
    expect(res.body[0].points).toBe(-5000);
    expect(res.status).toBe(200);
  });

  it('the response array contains objects with payers and points', async () => {
    await putTransactions(transactions);
    const res = await patchSpendPoints({ "points": 5000 });

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);

    expect(res.body[0].payer).toBe("DANNON");
    expect(res.body[0].points).toBe(-100);
    expect(res.body[1].payer).toBe("UNILEVER");
    expect(res.body[1].points).toBe(-200);
    expect(res.body[2].payer).toBe("MILLER COORS");
    expect(res.body[2].points).toBe(-4700);
  });

});


