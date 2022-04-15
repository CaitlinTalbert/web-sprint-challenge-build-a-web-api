const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (!project || project.null) {
      res.status(404).json({ message: "project ID not found" });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Error finding project ID",
    });
  }
}

async function validateProject(req, res, next) {
  const { name, description, complete } = req.body;
  if (!name || !description || typeof complete !== "boolean") {
    res.status(400).json({
      message: "Missing name, description, and completed",
    });
  } else {
    req.name = name;
    req.description = description;
    req.complete = complete;
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};
