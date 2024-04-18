'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username is required "
        },
        notNull: {
          msg: "Username is required "
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must unique"
      },
      validate: {
        isEmail: {
          msg: "Not Email"
        },
        notEmpty: {
          msg: "Email is required "
        },
        notNull: {
          msg: "Email is required "
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required "
        },
        notNull: {
          msg: "Password is required "
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
        user.role = 'staff'
      }
    }
  });
  return User;
};