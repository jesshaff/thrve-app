const router = require("express").Router();
// const userRoutes = require('./userRoutes');
const moodRoutes = require("./moodRoutes");
const healthRoutes = require("./healthRoutes");
const sleepRoutes = require("./sleepRoutes");
const postRoutes = require("./postRoutes");

// router.use('/users', userRoutes);
router.use("/mood", moodRoutes);
router.use("/health", healthRoutes);
router.use("/sleep", sleepRoutes);
router.use("/post", postRoutes);

module.exports = router;
