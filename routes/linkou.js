const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Traffic = require("../models/traffic");
const AccidentCategory = require("../models/accidentCategory");

router.get("/", ensureAuth, (req, res) => {
  res.render("stories/trafficInfo.hbs");
});

//@desc     Show add page
//@route    GET /stories/add
router.get("/add", ensureAuth, async (req, res) => {
  try {
    let allCategory = await AccidentCategory.find({}).lean();
    console.log("!@$@@#!", allCategory);
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
    await Traffic.create(req.body);
    res.redirect("linkou");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});
module.exports = router;
