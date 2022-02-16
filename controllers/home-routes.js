const router = require("express").Router();
const { Mood, User } = require("../models");

// GET all moods -- prob dont need this route but good for testing
router.get("/mood", async (req, res) => {
  try {
    const dbMoodData = await Mood.findAll();
    res.status(200).json(dbMoodData);
    console.log(dbMoodData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all mood data for specified user -- will update this to display mood data for session ID user
router.get("/mood/:id", async (req, res) => {
  try {
    const dbMoodData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Mood,
          attributes: ["id", "date_added", "rating"],
        },
      ],
    });

    res.status(200).json(dbMoodData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//posts a new mood rating - must be logged in and have a session id
router.post("/mood", async (req, res) => {
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

//     const Moods = dbMoodData.map((Moods) =>
//       Moods.get({ plain: true })
//     );

//     req.session.save(() => {
//       // We set up a session variable to count the number of times we visit the homepage
//       if (req.session.countVisit) {
//         // If the 'countVisit' session variable already exists, increment it by 1
//         req.session.countVisit++;
//       } else {
//         // If the 'countVisit' session variable doesn't exist, set it to 1
//         req.session.countVisit = 1;
//       }

//       res.render("homepage", {
//         Moods,
//         // We send over the current 'countVisit' session variable to be rendered
//         countVisit: req.session.countVisit,
//       });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // GET one gallery
// router.get("/gallery/:id", async (req, res) => {
//   try {
//     const dbGalleryData = await Gallery.findByPk(req.params.id, {
//       include: [
//         {
//           model: Painting,
//           attributes: [
//             "id",
//             "title",
//             "artist",
//             "exhibition_date",
//             "filename",
//             "description",
//           ],
//         },
//       ],
//     });

//     const gallery = dbGalleryData.get({ plain: true });
//     res.render("gallery", {
//       gallery,
//       // We are not incrementing the 'countVisit' session variable here
//       // but simply sending over the current 'countVisit' session variable to be rendered
//       countVisit: req.session.countVisit,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // GET one painting
// router.get("/painting/:id", async (req, res) => {
//   try {
//     const dbPaintingData = await Painting.findByPk(req.params.id);

//     const painting = dbPaintingData.get({ plain: true });

//     res.render("painting", {
//       painting,
//       // We are not incrementing the 'countVisit' session variable here
//       // but simply sending over the current 'countVisit' session variable to be rendered
//       countVisit: req.session.countVisit,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
