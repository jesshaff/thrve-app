const router = require("express").Router();
const { User, Health } = require("../models");

//======================== HEALTH ROUTES ============================//

router.get("/health", async (req, res) => {
  try {
    const dbMoodData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Health,
          attributes: ["date_added", "rating", "note"],
        },
      ],
    });

    res.status(200).json(dbMoodData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//posts a new Health rating - must be logged in and have a session id
router.post("/health", async (req, res) => {
  try {
    const newHealth = await Health.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newHealth);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
