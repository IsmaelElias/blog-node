const Comment = require('../models/Comment');
const Post = require('../models/Post');

class CommentController {
    async store(req, res) {
        const { text, author } = req.body;
        const comment = await Comment.create({
            text, 
            author, 
            post: req.params.post
        });

        const post = await Post.findById(req.params.post);

        post.comments.push(comment);

        post.save();

        return res.redirect('/posts/'+req.params.post);
    }

    async update(req, res) {
        const { id } = req.params;
        
        const comment = await Comment.findByIdAndUpdate(id, req.body);

        return res.json(comment);
    }

    async destroy(req, res) {
        const retorno = await Comment.findByIdAndRemove(req.params.id);

        return res.send("Comentário excluído com sucesso");
    }
}

module.exports = new CommentController;