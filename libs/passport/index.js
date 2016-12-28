const passport = require('koa-passport');

require('./serialize');

passport.use(require('./jwt'));

module.exports = passport;