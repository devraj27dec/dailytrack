import express from "express";
const router = express.Router();
import {
  CreateTask,
  updateTask,
  getAllTasks,
  getTask,
  clearTaskHistory,
  deleteTask,
  markedTaskComplete
} from "../controllers/task.controller.js";
import { Authenticated } from "../middleware/authentication.js";

router.post("/create", Authenticated, CreateTask);
router.get("/all", Authenticated, getAllTasks);
router.get("/:id", Authenticated, getTask);
router.post("/update/:id", Authenticated, updateTask);
router.delete('/delete/:id', Authenticated , deleteTask)
router.delete("/delete/many", Authenticated, clearTaskHistory);
router.post("/update/:id", Authenticated, markedTaskComplete);

export default router;
