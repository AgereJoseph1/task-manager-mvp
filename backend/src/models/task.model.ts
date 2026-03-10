import { query } from '../config/db';

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
  sortBy?: 'due_date' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const createTask = async (
  userId: string,
  data: {
    title: string;
    description?: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    due_date?: string | null;
  },
): Promise<Task> => {
  const { title, description, status, priority, due_date } = data;

  const result = await query(
    `INSERT INTO tasks (user_id, title, description, status, priority, due_date)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, title, description ?? null, status, priority, due_date ?? null],
  );

  return result.rows[0];
};

export const getTaskById = async (userId: string, taskId: string): Promise<Task | null> => {
  const result = await query(
    `SELECT * FROM tasks
     WHERE id = $1 AND user_id = $2`,
    [taskId, userId],
  );

  return result.rows[0] || null;
};

export const updateTask = async (
  userId: string,
  taskId: string,
  updates: Partial<Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'due_date'>>,
): Promise<Task | null> => {
  const fields: string[] = [];
  const values: unknown[] = [];
  let index = 1;

  Object.entries(updates).forEach(([key, value]) => {
    fields.push(`${key} = $${index}`);
    values.push(value);
    index += 1;
  });

  if (fields.length === 0) {
    return getTaskById(userId, taskId);
  }

  values.push(taskId);
  values.push(userId);

  const result = await query(
    `UPDATE tasks
     SET ${fields.join(', ')}, updated_at = NOW()
     WHERE id = $${index} AND user_id = $${index + 1}
     RETURNING *`,
    values,
  );

  return result.rows[0] || null;
};

export const deleteTask = async (userId: string, taskId: string): Promise<void> => {
  await query(
    `DELETE FROM tasks
     WHERE id = $1 AND user_id = $2`,
    [taskId, userId],
  );
};

export const listTasks = async (
  userId: string,
  filters: TaskFilters,
): Promise<{ tasks: Task[]; total: number }> => {
  const {
    status,
    priority,
    search,
    sortBy = 'created_at',
    sortOrder = 'desc',
    page = 1,
    limit = 20,
  } = filters;

  const whereClauses = ['user_id = $1'];
  const values: unknown[] = [userId];
  let index = 2;

  if (status) {
    whereClauses.push(`status = $${index}`);
    values.push(status);
    index += 1;
  }

  if (priority) {
    whereClauses.push(`priority = $${index}`);
    values.push(priority);
    index += 1;
  }

  if (search) {
    whereClauses.push(`(title ILIKE $${index} OR description ILIKE $${index})`);
    values.push(`%${search}%`);
    index += 1;
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const offset = (page - 1) * limit;

  const tasksResult = await query(
    `SELECT * FROM tasks
     ${whereSql}
     ORDER BY ${sortBy} ${sortOrder.toUpperCase()}
     LIMIT $${index} OFFSET $${index + 1}`,
    [...values, limit, offset],
  );

  const countResult = await query(
    `SELECT COUNT(*)::int AS count
     FROM tasks
     ${whereSql}`,
    values,
  );

  return {
    tasks: tasksResult.rows,
    total: countResult.rows[0]?.count ?? 0,
  };
};
