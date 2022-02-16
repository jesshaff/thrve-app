const router = require("express").Router();

const homeRoutes = require("./home-routes.js");
const userRoutes = require("./userRoutes");

router.use("/", homeRoutes, userRoutes);

module.exports = router;
