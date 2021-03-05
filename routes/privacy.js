const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

//@desc     Show add page
//@route    GET /stories/add
router.get("/", ensureAuth, (req, res) => {
  res.render("stories/privacy");
});

module.exports = router;
