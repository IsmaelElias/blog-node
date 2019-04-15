const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {
  host, port, user, pass,
} = require('../config/mail');

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

transport.use('compile', hbs({
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/resource/mail'),
    layoutsDir: path.resolve('./src/resource/mail'),
  },
  viewPath: path.resolve('./src/resource/mail'),
  extName: '.html',
}));

module.exports = transport;
