const User = require("./User");
const sleepRating = require("./sleepRating.js");
const moodRating = require("./moodRating");
const healthRating = require("./healthRating");

User.hasMany(sleepRating, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(moodRating, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(healthRating, {
  foreignKey: "user_id",
});

sleepRating.belongsTo(User, {
  foreignKey: "user_id",
});

moodRating.belongsTo(User, {
  foreignKey: "user_id",
});

healthRating.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, moodRating, sleepRating, healthRating };
