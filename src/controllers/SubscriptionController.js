/* eslint-disable class-methods-use-this */
const Subscription = require('../models/Subscription');

class SubscriptionController {
  async index(req, res) {
    const subscribers = await Subscription.find();

    return res.json(subscribers);
  }

  async subscribe(req, res) {
    const subscriber = await Subscription.create(req.body);

    return res.json(subscriber);
  }
}

module.exports = new SubscriptionController();
