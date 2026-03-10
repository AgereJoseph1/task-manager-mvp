import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { createTask, deleteTask, getTask, listTasks, updateTask } from '../services/task.service';

export const listTasksHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const result = await listTasks(userId, req.query as any);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const createTaskHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const task = await createTask(userId, req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTaskHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const task = await getTask(userId, id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTaskHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const task = await updateTask(userId, id, req.body);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTaskHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    await deleteTask(userId, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
