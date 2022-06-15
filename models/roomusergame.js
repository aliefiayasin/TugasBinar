'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomUserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static startGame = (roomid, userid1) => {
      return this.create({ roomid, userid1, input1: null, userid2 : null, input2 : null, winner : null })
    }

    static updateGame = ( id, userid, input)=> {
      var roomUserGame = RoomUserGame.findOne({ where: { roomid: id, userid1: userid} })
      if(roomUserGame != null) {
        return this.update({ userid1 : userid, input1 : input}, { where: { id: id } })
      }else{
        var isUserId2 = RoomUserGame.findOne({ where: { id: id, userid2: userid} })
        if(isUserId2){
          return this.update({ userid2 : userid, input2 : input}, { where: { id: id } })
        }
      }      
    }

    static updateGameWinner = ( id, winner)=> {
          return this.update({ winner : winner}, { where: { _id: id } })
    }
  }
  RoomUserGame.init({
    roomid: DataTypes.INTEGER,
    userid1: DataTypes.INTEGER,
    input1: DataTypes.STRING,
    userid2: DataTypes.INTEGER,
    input2: DataTypes.STRING,
    winner: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoomUserGame',
  });
  return RoomUserGame;
};