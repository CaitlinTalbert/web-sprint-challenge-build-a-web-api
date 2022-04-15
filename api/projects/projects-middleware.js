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

module.exports = {
  validateProjectId,
};
