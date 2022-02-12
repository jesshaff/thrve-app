const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class moodRating extends Model {}

moodRating.init(
  {
    date_added: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    rating: {
      type: DataTypes.INTERGER,
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
    modelName: "moodRating",
  }
);

module.exports = moodRating;
