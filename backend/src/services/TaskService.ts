import { Task } from '../entities/Task';
import { User } from '../entities/User';
import { AppDataSource } from '../data-source';
import logger from '../utils/logger';

export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);

  async getAll(userId: number, page: number, limit: number): Promise<{ tasks: Task[], total: number }> {
    logger.info(`Fetching tasks for user ${userId}, page ${page}, limit ${limit}`);
    const [tasks, total] = await this.taskRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdat: "DESC" },
    });
    return { tasks, total };
  }

  async create(taskData: Partial<Task>, userId: number): Promise<Task> {
    logger.info(`Creating task for user ${userId}: ${taskData.title}`);
    const user = new User();
    user.id = userId;
    const task = this.taskRepository.create({ ...taskData, user });
    return this.taskRepository.save(task);
  }

  async update(id: number, taskData: Partial<Task>, userId: number): Promise<Task | null> {
    logger.info(`Updating task ${id} for user ${userId}: ${taskData.title}`);
    const task = await this.taskRepository.findOne({ where: { id, user: { id: userId } } });
    if (!task) {
      logger.warn(`Task ${id} not found for user ${userId} during update`);
      return null;
    }
    this.taskRepository.merge(task, taskData);
    return this.taskRepository.save(task);
  }

  async delete(id: number, userId: number): Promise<void> {
    logger.info(`Deleting task ${id} for user ${userId}`);
    await this.taskRepository.delete({ id, user: { id: userId } });
  }

  async toggle(id: number, userId: number): Promise<Task | null> {
    logger.info(`Toggling task ${id} for user ${userId}`);
    const task = await this.taskRepository.findOne({ where: { id, user: { id: userId } } });
    if (!task) {
      logger.warn(`Task ${id} not found for user ${userId} during toggle`);
      return null;
    }
    task.completed = !task.completed;
    return this.taskRepository.save(task);
  }
}