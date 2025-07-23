import { TaskService } from '../services/TaskService';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { User } from '../entities/User';

// Mock AppDataSource and its repository
jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      merge: jest.fn(),
      findAndCount: jest.fn(),
    }),
  },
}));

describe('TaskService', () => {
  let taskService: TaskService;
  let mockTaskRepository: any;

  beforeEach(() => {
    taskService = new TaskService();
    mockTaskRepository = AppDataSource.getRepository(Task);
    jest.clearAllMocks();
  });

  const mockUserId = 1;
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdat: new Date(),
    updatedat: new Date(),
    user: new User(),
  };
  mockTask.user.id = mockUserId;

  describe('getAll', () => {
    it('should return all tasks for a user', async () => {
      (mockTaskRepository.findAndCount as jest.Mock).mockResolvedValue([[mockTask], 1]);
      const result = await taskService.getAll(mockUserId, 1, 10);
      expect(mockTaskRepository.findAndCount).toHaveBeenCalledWith({
        where: { user: { id: mockUserId } },
        skip: 0,
        take: 10,
        order: { createdat: "DESC" },
      });
      expect(result).toEqual({ tasks: [mockTask], total: 1 });
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const taskData = { title: 'New Task', description: 'New Desc' };
      const createdTask = { ...mockTask, ...taskData };
      (mockTaskRepository.create as jest.Mock).mockReturnValue(createdTask);
      (mockTaskRepository.save as jest.Mock).mockResolvedValue(createdTask);

      const result = await taskService.create(taskData, mockUserId);

      expect(mockTaskRepository.create).toHaveBeenCalledWith({ ...taskData, user: { id: mockUserId } });
      expect(mockTaskRepository.save).toHaveBeenCalledWith(createdTask);
      expect(result).toEqual(createdTask);
    });
  });

  describe('update', () => {
    it('should update an existing task', async () => {
      const updatedData = { title: 'Updated Task', completed: true };
      const updatedTask = { ...mockTask, ...updatedData };

      (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(mockTask);
      (mockTaskRepository.merge as jest.Mock).mockImplementation((entity: Task, data: Partial<Task>) => Object.assign(entity, data));
      (mockTaskRepository.save as jest.Mock).mockResolvedValue(updatedTask);

      const result = await taskService.update(mockTask.id, updatedData, mockUserId);

      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({ where: { id: mockTask.id, user: { id: mockUserId } } });
      expect(mockTaskRepository.merge).toHaveBeenCalledWith(mockTask, updatedData);
      expect(mockTaskRepository.save).toHaveBeenCalledWith(expect.objectContaining(updatedData));
      expect(result).toEqual(updatedTask);
    });

    it('should return null if task not found for update', async () => {
      (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(null);
      const result = await taskService.update(999, { title: 'Non Existent' }, mockUserId);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      (mockTaskRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });
      await taskService.delete(mockTask.id, mockUserId);
      expect(mockTaskRepository.delete).toHaveBeenCalledWith({ id: mockTask.id, user: { id: mockUserId } });
    });
  });

  describe('toggle', () => {
    it('should toggle task completion status', async () => {
      const initialCompleted = mockTask.completed;
      const expectedCompleted = !initialCompleted;

      (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(mockTask);
      (mockTaskRepository.save as jest.Mock).mockImplementation((taskToSave: Task) => Promise.resolve(taskToSave));

      const result = await taskService.toggle(mockTask.id, mockUserId);

      expect(mockTaskRepository.save).toHaveBeenCalledWith(expect.objectContaining({ completed: expectedCompleted }));
      expect(result?.completed).toEqual(expectedCompleted);
    });

    it('should return null if task not found for toggle', async () => {
      (mockTaskRepository.findOne as jest.Mock).mockResolvedValue(null);
      const result = await taskService.toggle(999, mockUserId);
      expect(result).toBeNull();
    });
  });
});