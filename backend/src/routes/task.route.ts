import express from 'express'
const router = express.Router()
import { CreateTask , getAllTasks } from '../controllers/task.controller.js'
import { Authenticated } from '../middleware/authentication.js';

router.post('/create' , Authenticated , CreateTask)
router.get('/tasks', Authenticated , getAllTasks)



export default router;