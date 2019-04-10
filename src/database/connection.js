const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blog-node", {
    useNewUrlParser: true
});

module.exports = mongoose;