const express = require("express");
const Action = require("./actions-model");
const { validateActionId, validateAction } = require("./actions-middlware");
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

//update existing action
router.put("/:id", validateActionId, validateAction, (req, res) => {
  Action.update(req.params.id, {
    project_id: req.project_id,
    description: req.description,
    completed: req.completed,
  })
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error updating this action",
      });
    });
});

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id);
    res.json(req.action);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
