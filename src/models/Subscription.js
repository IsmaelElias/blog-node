const mongoose = require('../database/Connection');

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
