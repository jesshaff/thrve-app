const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class sleepRating extends Model {}

sleepRating.init(
  {
    date_added: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "sleepRating",
  }
);

module.exports = sleepRating;
