const router = require("express").Router();
const { Mood, Health, Sleep, User, Post } = require("../models");
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
        {
          model: Post,
          attributes: ["id", "title", "post_text", "date_added"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const user = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("navi", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Login Redirect
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/navi");
    return;
  }

  res.render("login");
});

router.get("/register", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/navi");
    return;
  }

  res.render("register");
});

// Navi Render
router.get("/navi", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render("navi");
});

router.get("/physical", async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render("ratings");
});

router.get("/sleep", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render("ratings");
});

router.get("/mood", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render("ratings");
});

module.exports = router;
