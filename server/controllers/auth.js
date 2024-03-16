const { User } = require('../models')
const { signToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcryptjs');
class Auth {
    static async register(req, res, next) {
        let { username, email, password } = req.body
        try {
            let user = await User.create({ username, email, password })
            res.status(201).json({
                username: user.username,
                email: user.email,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async login(req, res, next) {
        let { email, password } = req.body
        try {
            if(!email) throw {name: "Bad Request", message: 'Email/Password is required'}
            if(!password) throw {name: "Bad Request", message: 'Email/Password is required'}
            let user = await User.findOne({ where: { email } })
            if (!user) throw { name: "Unauthorized", message: 'Invalid email/password' }
            if (comparePassword(password, user.password)) {
                let payload = { id: user.id }
                let token = signToken(payload)
                res.status(200).json({ access_token: token })
                return
            }
            throw { name: "Unauthorized", message: 'Invalid email/password' }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}
module.exports = Auth