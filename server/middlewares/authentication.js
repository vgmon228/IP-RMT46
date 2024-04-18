const { User } = require('../models');
const { verifyToken } = require('../helper/jwt');

module.exports = async (req, res, next) => {
    try {
        let accsess_token = req.headers.authorization
        if (!accsess_token) throw { name: "Unauthorized" , message:'Invalid Token' }
        let [type, token] = accsess_token.split(" ")
        if (type !== 'Bearer') throw { name: "Unauthorized" , message:'Invalid Token' }
        let payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
        if (!user) throw { name: "Unauthorized" , message:'Invalid Token' }
        req.user = {
            id: user.id,
        }
        next()
    } catch (error) {
        next(error)
    }
}