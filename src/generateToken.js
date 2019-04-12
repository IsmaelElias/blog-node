const jwt = require('jsonwebtoken');
const authSecret = require('./config/auth');

class generateToken{
    generate(params = {}){
        return jwt.sign(params, authSecret.secret, {
            expiresIn: 86400,
        })
    }
}

module.exports = new generateToken;