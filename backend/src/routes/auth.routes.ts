import { Router } from 'express';
import { registerHandler, loginHandler, meHandler } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validators';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', validateBody(registerSchema), registerHandler);
router.post('/login', validateBody(loginSchema), loginHandler);
router.get('/me', authMiddleware, meHandler);

export default router;
