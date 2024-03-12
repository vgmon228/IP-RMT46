const { User } = require('../models')
class Auth {
    static async register(req, res) {
        let { username, email, password } = req.body
        try {
            let user = await User.create({ username, email, password })
            res.status(201).json({
                username: user.username,
                email: user.email,
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Auth