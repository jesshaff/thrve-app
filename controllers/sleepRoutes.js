const router = require("express").Router();
const { User, Sleep } = require("../models");

//======================== SLEEP ROUTES ============================//

router.get("/sleep", async (req, res) => {
  try {
    const dbMoodData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Sleep,
          attributes: ["date_added", "rating"],
        },
      ],
    });

    res.status(200).json(dbMoodData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//posts a new sleep rating - must be logged in and have a session id
router.post("/sleep", async (req, res) => {
  try {
    const newSleep = await Sleep.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newSleep);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
