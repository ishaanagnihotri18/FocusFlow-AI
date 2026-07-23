const express = require("express");

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// GET ALL TASKS FOR LOGGED-IN USER
// GET /api/tasks
// ========================================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load tasks.",
    });
  }
});

// ========================================
// CREATE TASK
// POST /api/tasks
// ========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, priority, deadline } = req.body;

    if (!title || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Title and deadline are required.",
      });
    }

    const task = await Task.create({
      user: req.userId,
      title: title.trim(),
      priority: priority || "Medium",
      deadline,
      completed: false,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Create Task Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create task.",
    });
  }
});

// ========================================
// TOGGLE TASK COMPLETION
// PATCH /api/tasks/:id/toggle
// ========================================

router.patch(
  "/:id/toggle",
  authMiddleware,
  async (req, res) => {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        user: req.userId,
      });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found.",
        });
      }

      task.completed = !task.completed;

      await task.save();

      res.json({
        success: true,
        task,
      });
    } catch (error) {
      console.error("Toggle Task Error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to update task.",
      });
    }
  }
);
// ========================================
// DELETE ALL TASKS FOR LOGGED-IN USER
// DELETE /api/tasks
// ========================================

router.delete("/", authMiddleware, async (req, res) => {
  try {
    const result = await Task.deleteMany({
      user: req.userId,
    });

    res.json({
      success: true,
      message: "All tasks deleted successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete All Tasks Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete tasks.",
    });
  }
});
// ========================================
// DELETE TASK
// DELETE /api/tasks/:id
// ========================================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.userId,
      });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found.",
        });
      }

      res.json({
        success: true,
        message: "Task deleted successfully.",
      });
    } catch (error) {
      console.error("Delete Task Error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to delete task.",
      });
    }
  }
);

module.exports = router;