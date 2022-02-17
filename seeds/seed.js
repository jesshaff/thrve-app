const sequelize = require("../config/connection");
const { User, Mood } = require("../models");

const userData = require("./userData.json");
const moodData = require("./moodData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const rating of moodData) {
    await Mood.create({
      ...rating,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
