/* eslint-disable class-methods-use-this */
const bcrypt = require('bcryptjs');

const token = require('../generateToken');
const User = require('../models/User');

class LoginController {
  async index(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) return res.status(400).send({ error: 'User not found!' });

    if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Invalid password' });

    user.password = undefined;

    return res.send({ user, token: token.generate({ id: user.id }) });
  }
}

module.exports = new LoginController();
