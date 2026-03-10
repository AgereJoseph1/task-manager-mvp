import {
  createTask as createTaskModel,
  deleteTask as deleteTaskModel,
  getTaskById,
  listTasks as listTasksModel,
  updateTask as updateTaskModel,
  Task,
  TaskFilters,
  TaskPriority,
  TaskStatus,
} from '../models/task.model';
import { NotFoundError } from '../utils/errors';

export const createTask = async (
  userId: string,
  data: {
    title: string;
    description?: string | null;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: string | null;
  },
): Promise<Task> => {
  const task = await createTaskModel(userId, {
    title: data.title,
    description: data.description ?? null,
    status: data.status ?? 'todo',
    priority: data.priority ?? 'medium',
    due_date: data.due_date ?? null,
  });

  return task;
};

export const getTask = async (userId: string, taskId: string): Promise<Task> => {
  const task = await getTaskById(userId, taskId);
  if (!task) {
    throw new NotFoundError('Task not found');
  }
  return task;
};

export const updateTask = async (
  userId: string,
  taskId: string,
  updates: Partial<Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'due_date'>>,
): Promise<Task> => {
  const task = await updateTaskModel(userId, taskId, updates);
  if (!task) {
    throw new NotFoundError('Task not found');
  }
  return task;
};

export const deleteTask = async (userId: string, taskId: string): Promise<void> => {
  await deleteTaskModel(userId, taskId);
};

export const listTasks = async (
  userId: string,
  filters: TaskFilters,
): Promise<{
  data: Task[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}> => {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;

  const { tasks, total } = await listTasksModel(userId, filters);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    data: tasks,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};
