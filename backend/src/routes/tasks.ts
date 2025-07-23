import { Router } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask, toggleTask } from '../controllers/TaskController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTask);

export default router;