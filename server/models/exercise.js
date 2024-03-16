'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.belongsTo(models.Muscle)
    }
  }
  Exercise.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required "
        },
        notNull: {
          msg: "Name is required "
        }
      }
    },
    type: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Type is required "
        },
        notNull: {
          msg: "Type is required "
        }
      }
    },
    MuscleId: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "MuscleId is required "
        },
        notNull: {
          msg: "MuscleId is required "
        }
      }
    },
    equipment: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Equipment is required "
        },
        notNull: {
          msg: "Equipment is required "
        }
      }
    },
    difficulty: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Difficulty is required "
        },
        notNull: {
          msg: "Difficulty is required "
        }
      }
    },
    instructions: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Instruction is required "
        },
        notNull: {
          msg: "Instruction is required "
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};