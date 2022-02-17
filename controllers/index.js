const router = require("express").Router();

const userRoutes = require("./userRoutes");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

const healthRoutes = require("./healthRoutes");
const moodRoutes = require("./moodRoutes");
const sleepRoutes = require("./sleepRoutes");
const postRoutes = require("./postRoutes");

router.use(
  "/",
  homeRoutes,
  userRoutes,
  dashboardRoutes,
  healthRoutes,
  moodRoutes,
  sleepRoutes,
  postRoutes
);

module.exports = router;
