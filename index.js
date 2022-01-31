const app = require('./src/app');
const sequelize = require('./src/database');

//remove force:true on final version so it doesn't delete database when restarting
sequelize.sync({ force: true }).then(() => console.log('db is ready'));


app.listen(3000, () => console.log('app is running'));
