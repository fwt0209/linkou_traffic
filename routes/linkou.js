const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("stories/trafficInfo.hbs");
});
module.exports = router; 
