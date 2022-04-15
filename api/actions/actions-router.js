const express = require("express");
const Action = require("./actions-model");
const { validateActionId } = require("./actions-middlware");
const router = express.Router();

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  Action.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error retrieving the action with the specified ID",
      });
    });
});

//posts a new action that includes project_id, description, notes
router.post("/", (req, res) => {
  const { project_id, description, notes } = req.body;

  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: "The required fields are missing",
    });
    return;
  }
  Action.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error updating action",
      });
    });
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
