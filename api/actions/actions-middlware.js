const Action = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action || action.null) {
      res.status(404).json({ message: "action ID not found" });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Error finding action ID",
    });
  }
}

module.exports = {
  validateActionId,
};
