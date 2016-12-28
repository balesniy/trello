const juice = require('juice');
const fs = require('fs');
const path = require('path');
const Letter = require('../models/letter');

const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const stubTransport = require('nodemailer-stub-transport');
const SMTPTransport = require('nodemailer-smtp-transport');

const transportEngine = (process.env.NODE_ENV == 'test' || process.env.MAILER_DISABLED) ? stubTransport() :
                        new SMTPTransport({
                          service: "Gmail",
                          debug:   true,
                          auth:    {
                            user: 'alex.balesniy',
                            pass: 'sokolova123'
                          }
                        });

const transport = nodemailer.createTransport(transportEngine);

transport.use('compile', htmlToText());

module.exports = async function (options) {

  let message = {};

  message.from = {
    name:    'JavaScript.ru',
    address: 'course.test.mailer@gmail.com'
  };

  message.html = `<a href="${options.link}">${options.link}</a>`;
  message.html = juice(message.html);

  message.to = (typeof options.to == 'string') ? { address: options.to } : options.to;

  if (!message.to.address) {
    throw new Error("No email for recepient, message options:" + JSON.stringify(options));
  }

  message.subject = options.subject;

  message.headers = options.headers;

  let transportResponse = await transport.sendMail(message);

  return await Letter.create({
    message,
    transportResponse,
    messageId: transportResponse.messageId
  });
};
