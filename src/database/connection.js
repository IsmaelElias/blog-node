const mongoose = require('mongoose');

mongoose.connect("mongodb://mongodb/blog-node", {
    useNewUrlParser: true
});

module.exports = mongoose;