/* eslint-disable class-methods-use-this */
const crypto = require('crypto');
const User = require('../models/User');
const mailer = require('../modules/mail');

class ResetPasswordController {
  async forgotPassword(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail({
      to: email,
      from: 'ismael.esq@hotmail.com',
      template: 'forgot_password',
      context: { token },
    }, (err) => {
      if (err) return res.status(400).send({ error: 'Cannot send email ' });

      return res.send();
    });

    return res.send();
  }

  async resetPassword(req, res) {
    const { email, token, password } = req.body;

    const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

    if (!user) return res.status(400).send({ error: 'User not found' });

    if (token !== user.passwordResetToken) return res.status(400).send({ error: 'Invalid Token' });

    const now = new Date();

    if (now > user.passwordResetExpires) return res.status(400).send({ error: 'Token expired, generate a new one ' });

    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    user.password = password;

    await user.save();

    return res.send('Your password was updated with sucess');
  }
}

module.exports = new ResetPasswordController();
