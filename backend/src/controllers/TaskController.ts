import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

const taskService = new TaskService();

export const getAllTasks = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const { tasks, total } = await taskService.getAll(userId, page, limit);
  res.json({ tasks, total, page, limit });
};

export const createTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const task = await taskService.create(req.body, userId);
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const task = await taskService.update(Number(req.params.id), req.body, userId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  await taskService.delete(Number(req.params.id), userId);
  res.status(204).send();
};

export const toggleTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const task = await taskService.toggle(Number(req.params.id), userId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};