const express = require("express");
const Project = require("./projects-model");
const { validateProjectId } = require("./projects-middleware");
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

router.post("/projects", (req, res, next) => {});

router.put("/projects/:id", (req, res, next) => {});

router.delete("/projects/:id", (req, res, next) => {});

router.get("/projects/:id/actions", (req, res, next) => {});

module.exports = router;
