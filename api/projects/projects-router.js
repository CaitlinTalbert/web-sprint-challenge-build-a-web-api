const express = require("express");
const Project = require("./projects-model");
const { validateProjectId, validateProject } = require("./projects-middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res) => {
  Project.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error retrieving the project with the specified ID",
      });
    });
});

//posts a new project
router.post("/", (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({
      message: "The required fields are missing",
    });
    return;
  }
  Project.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error updating project",
      });
    });
});

//updates existing project
router.put("/:id", validateProjectId, validateProject, (req, res) => {
  Project.update(req.params.id, {
    name: req.name,
    description: req.description,
    completed: req.completed,
  })
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error updating the project",
      });
    });
});

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Project.remove(req.params.id);
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

//returns an array of actions that belongs to the given project ID
router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const result = await Project.getProjectActions(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
