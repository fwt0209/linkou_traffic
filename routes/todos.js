const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Todos = require("../models/todo");

// let data_for_findItemById = new Todos({ _id: "5f97e6e7fc1e993a94b83a14" });
// let data_for_findUncompletedThings = new Todos({ completed: false });
router.get("/", async (req, res) => {
  try {
    // const toDos = await data_for_findItemById.findItemById();

    // const toDos = await data_for_findUncompletedThings.findUncompletedThings(
    //   (callback) => {
    //     console.log("callback", callback);
    //   }
    // );

    const toDos = data_for_saveHook1.saveHook1((err, doc) => {
      if (err) {
        console.error(err);
      }
      console.log("ddddoc!~!~", doc);
    });

    console.log("todo", toDos);

    res.send("");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

let data_for_saveHook1 = new Todos({
  description: "Learn Oracle",
  completed: true,
});
router.post("/", async (req, res) => {
  try {
    const toDos = data_for_saveHook1.saveHook1((err, doc) => {
      if (err) {
        console.error(err);
      }
      console.log("ddddoc!~!~", doc);
    });

    console.log("todo", toDos);

    res.send("");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
