'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Account.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Name is required"
        }
      }
    },
    username: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Username is required"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Password is required"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Email is required"
        }
      }
    },
    reference: {
      type : DataTypes.INTEGER,
      references : {
        model : "Accounts",
        key : "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Account',
    hooks : {
      beforeCreate (instance) {
        const salt = bcrypt.genSaltSync(10)
        let myPlaintextPassword = instance.password
        const hash = bcrypt.hashSync(myPlaintextPassword, salt)
        instance.password = hash
      }
    }
  });
  return Account;
};