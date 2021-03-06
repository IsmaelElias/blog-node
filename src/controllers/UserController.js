/* eslint-disable class-methods-use-this */
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const token = require('../generateToken');


class UserController {
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  }

  async show(req, res) {
    const user = await User.findById(req.params.id);

    return res.json(user);
  }

  async store(req, res) {
    const { email } = req.body;

    if (await User.findOne({ email })) return res.status(400).send({ error: 'Email já cadastrado no sistema!' });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user, token: token.generate({ id: user.id }) });
  }

  async update(req, res) {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('+password');

    return res.json(user);
  }

  async destroy(req, res) {
    await User.findByIdAndRemove(req.params.id);

    return res.send('Usuário excluído com sucesso');
  }
}

module.exports = new UserController();
