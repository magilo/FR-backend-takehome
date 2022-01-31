// const request = require('supertest');
// const app = require('../src/app');
// const sequelize = require('../src/database');
// const Transaction = require('../src/transaction/Transaction');

// beforeAll(() => {
//   return sequelize.sync();
// });

// //clean user table before each it block
// beforeEach(() => {
//   return Transaction.destroy({ truncate: true });
// })

// describe('Add Single Transaction', () => {

//   const postValidTransaction = () => {
//     return request(app)
//       .post('/api/transactions')
//       .send({
//         "payer": "DANNON",
//         "points": 1000,
//         "timestamp": "2020-11-02T14:00:00Z"
//       })
//   }

//   it('returns 200 OK when add transaction request is valid', async () => {
//     const response = await postValidTransaction();
//     expect(response.status).toBe(200);
//   })

//   it('returns success message when add transaction request is valid', async () => {
//     const response = await postValidTransaction();
//     expect(response.body.message).toBe('transaction added');
//   })

//   it('saves the transaction to the database', async () => {
//     await postValidTransaction();
//     const transactionList = await Transaction.findAll();
//     expect(transactionList.length).toBe(1);
//   })

//   it('saves the payer, points, timestamp to the database', async () => {
//     await postValidTransaction();
//     const transactionList = await Transaction.findAll();
//     const savedTransaction = transactionList[0];
//     expect(savedTransaction.payer).toBe('DANNON');
//     expect(savedTransaction.points).toBe(1000);
//     expect(savedTransaction.timestamp).toBe("2020-11-02T14:00:00Z");
//     expect(savedTransaction.leftover).toBe(1000);
//   })

// })





