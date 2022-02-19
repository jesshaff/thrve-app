const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// get all posts + RENDER dashboard
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "post_text", "date_added"],
    order: [["date_added", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })

    .then((dbPostData, userData) => {
      //serialize the data before passing to the template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // const user = userData.map(user);
      res.render("dashboard", { posts, name, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a single post
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_text", "date_added"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      //serialize the data
      const post = dbPostData.get({ plain: true });
      // pass to the template
      res.render("edit-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new", (req, res) => {
  res.render("new-post");
});

module.exports = router;
