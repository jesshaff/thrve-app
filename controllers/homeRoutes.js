const router = require("express").Router();
const { Mood, Health, Sleep, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Get all user data
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Mood,
          attributes: ["rating", "date_added"],
        },
        {
          model: Sleep,
          attributes: ["rating", "date_added"],
        },
        {
          model: Health,
          attributes: ["rating", "date_added", "note"],
        },
      ],
    });

    // Serialize data so the template can read it
    const user = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
