const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class healthRating extends Model {}

healthRating.init(
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
    modelName: "healthRating",
  }
);

module.exports = healthRating;
