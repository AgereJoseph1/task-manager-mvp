import { Router } from 'express';
import healthRouter from './health.routes';
import authRouter from './auth.routes';
import taskRouter from './task.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/tasks', taskRouter);

export default router;
