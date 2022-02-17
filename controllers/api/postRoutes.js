const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

// get recent posts created to document health
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_text", "date_added"],
    order: [["date_added", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
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
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a new post to document your health status and progress
router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//modify any posts that may need to be updated with new information
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete a particular post that may not be needed anymore
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
