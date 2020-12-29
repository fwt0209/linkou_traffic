const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Story = require("../models/story");

//@desc     Login/Landing page
//@route    GET /
router.get('/', ensureGuest, (req, res) => {
    res.render("login-form", {
        layout: "login"
    });
});




module.exports = router;