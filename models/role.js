'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    }
  });

  Role.associate = function(models){
    Role.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id'
    })
  }

  Role.createRole = async function(user){

    let role = await this.create({
      userId: user.id
    })
  }

  return Role
}