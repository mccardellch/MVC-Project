// setup controllers
// automatically imported when the (parent) folder is imported
// this file will pull in other files we want in public scope
// pull in Account and Domo

module.exports.Account = require('./Account.js');
module.exports.Domo = require('./Domo.js');
module.exports.Location = require('./Location.js');
