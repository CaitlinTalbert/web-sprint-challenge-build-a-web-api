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

router.put("/:id", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

router.get("/:id/actions", (req, res, next) => {});

module.exports = router;
