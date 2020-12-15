const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const { paginator } = require("../middleware/pagination");

const Traffic = require("../models/traffic");
const AccidentCategory = require("../models/accidentCategory");
const traffic = require("../models/traffic");

router.get("/test", paginator(Traffic), async (req, res) => {
  const page = res.paginatedResults;
  // console.log(page);
  res.json(page);
});
router.post("/test", async (req, res) => {
  console.log(req);
  traffic
    .updateOne({
      location: "ww",
      finished: false,
      body: "<p>hello!?</p>",
      user: "5f9f622522c04355c86b8e88",
      trafficCategory: "5fcee4da7a8340e07c14c74b",
    })
    .where("_id", "5fd2d8a4d4675f5998a2b5ab")
    .exec();
});

router.get("/", ensureAuth, (req, res) => {
  res.render("stories/trafficInfo.hbs");
});

//@desc     Show add page
//@route    GET /stories/add
router.get("/add", ensureAuth, async (req, res) => {
  try {
    let allCategory = await AccidentCategory.find().lean();
    res.render("stories/add", { allCategory });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc     Process add form
//@route    POST /stories
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    let category = await AccidentCategory.findOne({
      accidentValue: req.body.trafficSelector,
    });

    req.body.accidentCategory = category._id;
    await Traffic.create(req.body);
    res.redirect("linkou");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});
module.exports = router;
