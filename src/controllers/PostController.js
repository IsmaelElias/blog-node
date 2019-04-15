/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */
const Post = require('../models/Post');
const Subscription = require('../models/Subscription');
const mailer = require('../modules/mail');

class PostController {
  async index(req, res) {
    const posts = await Post.find().populate('author');

    posts.map((post) => {
      post.text = undefined;
      post.comments = undefined;
    });

    return res.json(posts);
  }

  async store(req, res) {
    const post = await Post.create(req.body);

    const { id } = post;

    const subscriptions = await Subscription.find();

    subscriptions.forEach((subscription) => {
      mailer.sendMail({
        to: subscription.email,
        from: 'ismael.esq@hotmail.com',
        template: 'subscription',
        context: { id },
      }, (err) => {
        if (err) return res.status(400).send({ error: 'Cannot send E-mail ' });

        return res.send();
      });
    });

    return res.json(post);
  }

  async show(req, res) {
    const post = await Post.findById(req.params.id).populate(['author', 'comments']);

    post.comments.map((comment) => {
      comment.post = undefined;
    });

    return res.json(post);
  }

  async update(req, res) {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.json(post);
  }

  async destroy(req, res) {
    await Post.findByIdAndRemove(req.params.id);

    return res.send('Post excluído com sucesso');
  }
}

module.exports = new PostController();
