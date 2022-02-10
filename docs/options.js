/* options for swaggerJSDoc */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MG Rewards API project',
      version: '1.0.0',
      description: "Web service for adding and spending rewards points in user account."
    },
    servers: [
      {
        url: 'http://localhost:3000/'
      }
    ]
  },
  apis: [
    './src/routes/PointsBalanceRouter.js',
    './src/routes/SpendRouter.js',
    './src/routes/TransactionRouter.js',
    './docs/definitions.yaml',
    './docs/user.yaml',
    './docs/transaction.yaml'
  ]
}

module.exports = options;
