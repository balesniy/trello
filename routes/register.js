const User = require('../models/user');
const passport = require('koa-passport');
const sendMail = require('../libs/sendMail');

exports.post = async function (ctx) {
  const { email, password, name } = ctx.request.body;
  var verifyEmailToken = Math.random().toString(36).slice(2, 10);
  var user = new User({
    email:            email.toLowerCase(),
    displayName:      name.trim(),
    password,
    verifiedEmail:    false,
    verifyEmailToken: verifyEmailToken,
  });
  try {
    await user.save();
  } catch (e) {
    if (e.name == 'ValidationError') {
      ctx.body = { 'error': e.errors };
      return;
    }
    else {
      ctx.throw(e);
    }
  }

  await sendMail({
    template: 'verify-registration-email',
    to:       user.email,
    subject:  "Подтверждение email",
    link:     '/verify-email/' + verifyEmailToken
  });

  ctx.body =
    { message: 'Вы зарегистрированы. Пожалуйста, загляните в почтовый ящик, там письмо с Email-подтверждением.' };

};
