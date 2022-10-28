const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.generateToken = (userId) => {
    return jwt.sign({userId}, secret,{
        expiresIn: '120d',
    });
};

