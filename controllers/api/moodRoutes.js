const router = require("express").Router();
const { Mood, User } = require("../../models");

//get all mood data for logged in user
router.get("/", async (req, res) => {
  try {
    const dbMoodData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Mood,
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

//posts a new mood rating for logged in user
router.post("/", async (req, res) => {
  try {
    const newMood = await Mood.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMood);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
