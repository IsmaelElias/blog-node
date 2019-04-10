const express = require('express');
const router = express.Router();

//Controllers
const PostController = require('./controllers/PostController');
const UserController = require('./controllers/UserController');
const CommentController = require('./controllers/CommentController');

router.get('/posts', PostController.index);
router.get('/posts/:id', PostController.show);
router.post('/posts', PostController.store);
router.put('/posts/:id', PostController.update);
router.delete('/posts/:id', PostController.destroy);

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);

router.post('/post/:post/comment', CommentController.store);
router.put('/post/:post/comment/:id', CommentController.update);
router.delete('/post/:post/comment/:id', CommentController.destroy);

module.exports = router;