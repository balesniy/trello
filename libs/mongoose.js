var mongoose = require('mongoose');
const beautify = require('mongoose-beautiful-unique-validation');
mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/app');
mongoose.plugin(beautify);
module.exports = mongoose;