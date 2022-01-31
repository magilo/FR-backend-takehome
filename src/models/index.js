const Transaction = require('./Transaction');
const Partner = require('./Partner');

Transaction.belongsTo(Partner);
Partner.hasMany(Transaction);


module.exports = {
  Partner,
  Transaction
}
