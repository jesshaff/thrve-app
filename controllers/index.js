const router = require("express").Router();

const userRoutes = require("./userRoutes");
const homeRoutes = require("./homeRoutes");

const healthRoutes = require("./healthRoutes");
const moodRoutes = require("./moodRoutes");
const sleepRoutes = require("./sleepRoutes");

router.use("/", homeRoutes, userRoutes, healthRoutes, moodRoutes, sleepRoutes);

module.exports = router;
