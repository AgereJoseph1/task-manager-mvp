import { Router } from 'express';
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  listTasksHandler,
  updateTaskHandler,
} from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateBody, validateQuery } from '../middleware/validation.middleware';
import { createTaskSchema, updateTaskSchema, listTasksQuerySchema } from '../validators/task.validators';

const router = Router();

router.use(authMiddleware);

router.get('/', validateQuery(listTasksQuerySchema), listTasksHandler);
router.post('/', validateBody(createTaskSchema), createTaskHandler);
router.get('/:id', getTaskHandler);
router.put('/:id', validateBody(updateTaskSchema), updateTaskHandler);
router.delete('/:id', deleteTaskHandler);

export default router;
