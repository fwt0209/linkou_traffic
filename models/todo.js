const mongoose = require("mongoose");

const ToDosSchema = new mongoose.Schema({
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, required: true },
});

ToDosSchema.methods.findItemById = function (callback) {
  return this.model("Todos").findById({ _id: this._id }, callback);
};

// 添加 instance method 的另一種寫法
ToDosSchema.method("findUncompletedThings", function (callback) {
  return this.model("Todos").find({ completed: this.completed }, callback);
});

ToDosSchema.methods.saveHook1 = function (callback) {
  return this.save(callback);
};

ToDosSchema.pre("save", function (next) {
  console.log("saveHook1~~~!");
  next();
});
ToDosSchema.pre("save", function (next) {
  console.log("saveHook2~~~!");
  next();
});
ToDosSchema.pre("save", true, function (next, done) {
  console.log("saveHook3~~~!，異步1");
  next();
  setTimeout(() => {
    console.log("saveHook3~~~!，異步1結束");
    done();
  }, 100);
});
ToDosSchema.pre("save", true, function (next, done) {
  console.log("saveHook4~~~!，異步2");
  next();
  setTimeout(() => {
    console.log("saveHook4~~~!，異步2結束");
    done();
  }, 100);
});

module.exports = mongoose.model("Todos", ToDosSchema);
