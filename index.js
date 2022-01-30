const app = require('./src/app');
const sequelize = require('./src/database');

sequelize.sync().then(() => console.log('db is ready'));


app.listen(3000, () => console.log('app is running'));
