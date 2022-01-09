'use strict';
const {v4} = require('uuid')
const {Model} = require('sequelize');
const { UUIDV4 } = require('sequelize');
const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");
const res = require('express/lib/response');

module.exports = (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define("RefreshToken", {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });
  
  RefreshToken.associate = function(models){
    RefreshToken.belongsTo(models.User, {
      foreignKey: 'userId', 
      targetKey: 'id'
    })
  }

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();

    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });

    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  RefreshToken.isTokenPresent = async function (id) {
      return await this.findOne({
        where: {
          userId : id
        }
      }).then(token => { return token}).catch(err => {res.status(400).json({message: err.message})})
  }

  return RefreshToken;
};
