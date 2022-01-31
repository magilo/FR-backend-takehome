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


// const postTransaction1 = () => {
//   return request(app)
//     .post('/api/transactions')
//     .send({
//       "payer": "DANNON",
//       "points": 1000,
//       "timestamp": "2020-11-02T14:00:00Z"
//     })
// }
// const postTransaction2 = () => {
//   return request(app)
//     .post('/api/transactions')
//     .send({
//       "payer": "UNILEVER",
//       "points": 200,
//       "timestamp": "2020-10-31T11:00:00Z"
//     })
// }

// const postTransaction3 = () => {
//   return request(app)
//     .post('/api/transactions')
//     .send({
//       "payer": "DANNON",
//       "points": -200,
//       "timestamp": "2020-10-31T15:00:00Z"
//     })
// }

// const postTransaction4 = () => {
//   return request(app)
//     .post('/api/transactions')
//     .send({
//       "payer": "MILLER COORS",
//       "points": 10000,
//       "timestamp": "2020-11-01T14:00:00Z"
//     })
// }

// const postTransaction5 = () => {
//   return request(app)
//     .post('/api/transactions')
//     .send({
//       "payer": "DANNON",
//       "points": 300,
//       "timestamp": "2020-10-31T10:00:00Z"
//     })
// }



// it('saves multiple transactions to the database', async () => {
//   await Promise.all([
//     postTransaction1(),
//     postTransaction2(),
//     postTransaction3(),
//     postTransaction4(),
//     postTransaction5()]);



//   const transactionList = await Transaction.findAll();
//   // console.log(transactionList.length, transactionList);
//   expect(transactionList.length).toBe(5);
// })

// //get multiple transactions
// it('returns multiple transactions sorted by oldest date first', async () => {
//   await Promise.all([
//     postTransaction1(),
//     postTransaction2(),
//     postTransaction3(),
//     postTransaction4(),
//     postTransaction5()]);


//   const { body } = await request(app).get('/api/transactions');
//   //expect array to be sorted by timestamp
//   // console.log('body', body);
//   expect(body[0].timestamp).toEqual("2020-10-31T10:00:00Z")
//   expect(body[1].timestamp).toEqual("2020-10-31T11:00:00Z")
//   expect(body[2].timestamp).toEqual("2020-10-31T15:00:00Z")
//   expect(body[3].timestamp).toEqual("2020-11-01T14:00:00Z")
//   expect(body[4].timestamp).toEqual("2020-11-02T14:00:00Z")

//   //this query part goes in router code
//   // const transactionList = await Transaction.findAll({
//   //   attributes: ['timestamp'],
//   //   order: sequelize.col('timestamp')
//   // });
//   // console.log(transactionList.length, transactionList);


// })
