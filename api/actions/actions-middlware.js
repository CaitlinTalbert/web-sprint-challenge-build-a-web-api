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

async function validateAction(req, res, next) {
  const { project_id, description, completed } = req.body;
  if (!project_id || !description || typeof completed !== "boolean") {
    res.status(400).json({
      message: "Missing project ID, description, and completed",
    });
  } else {
    req.project_id = project_id;
    req.description = description;
    req.completed = completed;
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
};
