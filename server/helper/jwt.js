const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRET
function signToken(value) {
    return jwt.sign(value, key)
}
function verifyToken(value) {
    return jwt.verify(value, key)
}

module.exports = { signToken, verifyToken }