// generate a valid object id from an arbitrary string

var crypto = require('crypto');

// oid('course1') => generates always same id
module.exports = function oid(str) {
  return crypto.createHash('md5').update(str).digest('hex').substring(0, 24);
};