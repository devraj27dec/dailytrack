import express from 'express'
const router = express.Router()
import { CreateTask , deleteTask, getAllTasks, getTask } from '../controllers/task.controller.js'
import { Authenticated } from '../middleware/authentication.js';

router.post('/create' , Authenticated , CreateTask)
router.get('/tasks', Authenticated , getAllTasks)
router.get('/task/:id', Authenticated , getTask)
router.delete('/delete/:id', Authenticated , deleteTask)


export default router;