const User = require("./user");
const sleepRating = require("./sleepRating.js");
const Mood = require("./Mood");
const healthRating = require("./healthRating");

User.hasMany(sleepRating, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Mood, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(healthRating, {
  foreignKey: "user_id",
});

sleepRating.belongsTo(User, {
  foreignKey: "user_id",
});

Mood.belongsTo(User, {
  foreignKey: "user_id",
});

healthRating.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Mood, sleepRating, healthRating };
