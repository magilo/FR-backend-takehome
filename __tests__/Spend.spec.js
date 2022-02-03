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

const patchSpend5000 = (spent = { "points": 5000 }) => {
  const agent = request(app).patch('/api/user/spend');
  return agent.send(spent)
}

const patchSpend300 = (spent = { "points": 300 }) => {
  const agent = request(app).patch('/api/user/spend');
  return agent.send(spent);
}

const patchSpend0 = (spent = { "points": 0 }) => {
  const agent = request(app).patch('/api/user/spend');
  return agent.send(spent);
}

const putDannon300 = () => {
  return request(app)
    .put('/api/transactions/DANNON')
    .send({
      "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z"
    })
}

const putMiller10000 = () => {
  return request(app)
    .put('/api/transactions/MILLER COORS')
    .send({
      "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z"
    })
}


it('returns status and message if request is valid', async () => {
  const res = await patchSpend5000();
  expect(res.status).toBe(200);
  expect(res.body.message).toBe("no points available");
  expect(res.body.balance).toBe(0);
})

it('returns with message if user does not have enough points for the spend request', async () => {
  await putDannon300();
  const res = await patchSpend5000();

  expect(res.body.message).toBe("not enough points");
  expect(res.body.balance).toBe(300);
})

it('returns with balance if user has no points', async () => {
  const res = await patchSpend0();

  expect(res.body.message).toBe("no points available");
  expect(res.body.balance).toBe(0);
})

// it('responds with how many points the payer paid', async () => {
//   await putDannon300();
//   const res = await patchSpend300();

//   expect(Array.isArray(res.body)).toBe(true);
//   expect(res.body.length).toBe(1);
//   expect(res.body[0].payer).toBe("DANNON");
//   expect(res.body[0].points).toBe(-300);
//   expect(res.status).toBe(200);
//   // expect(res.body.message).toBe("points have been spent");
// })

it('handles cases where there will be leftover points in the transaction', async () => {
  await putMiller10000();
  res = await patchSpend5000();

  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(1);
  expect(res.body[0].payer).toBe("MILLER COORS");
  expect(res.body[0].points).toBe(-5000);
  expect(res.status).toBe(200);
})

// it('the res array contains objects with payers and points', async () => {
//   await putTransactions(transactions);
//   const data = await patchSpend5000();

//   expect(Array.isArray(data)).toBe(true);
//   expect(data.length).toBe(3);

//   expect(data[0].payer).toBe("DANNON");
//   expect(data[0].points).toBe(-100);
//   expect(data[1].payer).toBe("UNILEVER");
//   expect(data[1].points).toBe(-200);
//   expect(data[2].payer).toBe("MILLER COORS");
//   expect(data[2].points).toBe(-4700);
// })


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

