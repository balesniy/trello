var passport = require('koa-passport');
var jwt = require("jwt-simple");
let User = require('../models/user');
exports.post = async function (ctx) {
  const { email, password } = ctx.request.body;
  let user;
  try {
    user = await User.findOne({ email })
  } catch (e) {
    console.log(e);
  }
  if (!user || !user.checkPassword(password)) {
    // don't say whether the user exists
    ctx.body = { message: 'Нет такого пользователя или пароль неверен.' };
  }
  var token = jwt.encode(email, 'MyS3cr3tK3Y');
  ctx.body = {
    token,
    name: user.displayName
  }
};
//passport.authenticate("jwt", { session: false });