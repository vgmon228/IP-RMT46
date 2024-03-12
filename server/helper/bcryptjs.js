const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
module.exports = {
    hashPassword: (password) => bcrypt.hashSync(password,10),
    comparePassword: (password,db_password) => bcrypt.compareSync(password,db_password)
}