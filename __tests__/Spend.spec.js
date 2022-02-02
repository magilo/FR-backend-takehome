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

const patchPointsSpend2 = (spent = { "points": 300 }) => {
  const agent = request(app).patch('/api/user/spend');
  return agent.send(spent);
}

const putTransaction1 = () => {
  return request(app)
    .put('/api/transactions/DANNON')
    .send({
      "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z"
    })
}


it('returns success message if request is valid', async () => {
  const response = await patchPointsSpend1();
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("no points available");
})

it('responds with how many points the payer paid', async () => {
  await putTransaction1();
  const res = await patchPointsSpend2();

  console.log('res', res.body);

  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(1);
  expect(res.body[0].payer).toBe("DANNON");
  expect(res.body[0].points).toBe(-300);
  expect(res.status).toBe(200);
  // expect(res.body.message).toBe("points have been spent");
})


// it('responds with an array', async () => {
//   //add dummy data to tables
//   await putTransactions(transactions);
//   // const transactionList = await Partner.findAll();//not needed

//   const data = await patchPointsSpend1();

//   expect(Array.isArray(data)).toBe(true);
//   expect(data.length).toBe(3);
// })

// it('the response array contains objects with payers and points', async () => {
//   await putTransactions(transactions);
//   const data = await patchPointsSpend1();

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

