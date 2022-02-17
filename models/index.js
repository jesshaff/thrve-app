const User = require("./user");
const Sleep = require("./Sleep.js");
const Mood = require("./Mood");
const Health = require("./Health");
const Post = require("./Post");

User.hasMany(Sleep, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Mood, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "user_id",
});

User.hasMany(Health, {
  foreignKey: "user_id",
});

Sleep.belongsTo(User, {
  foreignKey: "user_id",
});

Mood.belongsTo(User, {
  foreignKey: "user_id",
});

Health.belongsTo(User, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Mood, Sleep, Health, Post };
