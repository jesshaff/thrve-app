const router = require("express").Router();

const userRoutes = require("./userRoutes");

const healthRoutes = require("./healthRoutes");
const moodRoutes = require("./moodRoutes");
const sleepRoutes = require("./sleepRoutes");

router.use("/", userRoutes, healthRoutes, moodRoutes, sleepRoutes);

module.exports = router;
