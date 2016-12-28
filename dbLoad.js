var path = require('path');
var loadModels = require('./libs/loadModels');
var clearDatabase = require('./libs/clearDatabase');

module.exports = async function () {
  var dbPath = path.join(__dirname, 'fixtures/users.js');
  console.log("loading db " + dbPath);
  await clearDatabase();
  await loadModels(require(dbPath));
  console.log("loaded db " + dbPath);
};
