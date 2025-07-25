import { Router } from 'express';
import authRouter from './auth';
import taskRouter from './tasks';

const router = Router();

router.use('/auth', authRouter);
router.use('/tasks', taskRouter);

export default router;