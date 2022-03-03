const router = require("express").Router();
const { Mood, User } = require("../../models");
const fs = require("fs");

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

    let data = JSON.stringify(newMood, null, 2);

    fs.appendFile(`'${req.session.user_id}-mood.json'`, data, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });

    res.status(200).json(newMood);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
