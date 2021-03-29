function paginator(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        // limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        // limit: limit,
      };
    }
    let localDateTime = new Date();
    let thisYear = localDateTime.getFullYear();
    let thisMonth = localDateTime.getMonth();
    let todayDate = localDateTime.getDate();
    let passed1days = new Date(thisYear, thisMonth, todayDate);
    try {
      results.results = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .populate("accidentCategory")
        .populate("user")
        .where("createdAt")
        .gte(passed1days)
        .sort({ createdAt: "desc" })
        .lean()
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = { paginator };
