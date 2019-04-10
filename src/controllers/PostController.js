const Post = require('../models/Post');

class PostController{

    async index(req, res) {
        const posts = await Post.find().populate('author');

        posts.map(post => {
            post.text = undefined;
            post.comments = undefined;
        });

        return res.json(posts);
    };

    async store(req, res) {
        const post = await Post.create( req.body );

        return res.json(post);
    }

    async show(req, res) {
        const post = await Post.findById(req.params.id).populate(['author', 'comments']);

        post.comments.map(comment => {
            comment.post = undefined;
        });

        return res.json(post);
    }

    async update(req, res) {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new:true });
        
        return res.json(post);
    }

    async destroy(req, res) {
        await Post.findByIdAndRemove(req.params.id);

        return res.send('Post excluído com sucesso');
    }
}

module.exports = new PostController;