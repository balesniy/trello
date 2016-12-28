var passportJWT = require("passport-jwt");
let User = require('../../models/user');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey:    'MyS3cr3tK3Y',
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = new Strategy(params, function ({ email, password }, done) {
  User.findOne({ email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user || !user.checkPassword(password)) {
      // don't say whether the user exists
      return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
    }
    return done(null, user);
  });
});
