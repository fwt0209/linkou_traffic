const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Parent = require("../models/family");

const addNewParent = new Parent({
  name: "Kev",
  child: { name: "Tom" },
  grandChildren: [{ name: "Mary" }, { name: "Pong" }],
});

router.post("/", async (req, res) => {
  try {
    const newParent = await addNewParent.save();
    console.trace(newParent);
    res.send("ok");
  } catch (err) {
    console.error(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const parents = await Parent.find();
    console.trace(parents);
    res.send(parents);
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
