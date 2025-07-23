import { AuthService } from '../services/AuthService';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock AppDataSource and its repository
jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    }),
  },
}));

// Mock bcrypt and jsonwebtoken
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: any;

  beforeEach(() => {
    authService = new AuthService();
    mockUserRepository = AppDataSource.getRepository(User);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const hashedPassword = 'hashedPassword';
      const createdUser = { id: 1, ...userData, password: hashedPassword };

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (mockUserRepository.create as jest.Mock).mockReturnValue(createdUser);
      (mockUserRepository.save as jest.Mock).mockResolvedValue(createdUser);

      const result = await authService.register(userData);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith({ ...userData, password: hashedPassword });
      expect(mockUserRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });

    it('should throw an error if email or password are missing', async () => {
      await expect(authService.register({ email: 'test@example.com' })).rejects.toThrow('Email and password are required');
      await expect(authService.register({ password: 'password123' })).rejects.toThrow('Email and password are required');
    });

    it('should throw an error if user already exists', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(new User());

      await expect(authService.register(userData)).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should log in a user successfully and return a token', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const hashedPassword = 'hashedPassword';
      const existingUser = { id: 1, ...userData, password: hashedPassword };
      const token = 'mockToken';

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(existingUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = await authService.login(userData);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, hashedPassword);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      expect(result).toEqual({ user: existingUser, token });
    });

    it('should throw an error if email or password are missing', async () => {
      await expect(authService.login({ email: 'test@example.com' })).rejects.toThrow('Email and password are required');
      await expect(authService.login({ password: 'password123' })).rejects.toThrow('Email and password are required');
    });

    it('should throw an error for invalid credentials (user not found)', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(authService.login(userData)).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error for invalid credentials (incorrect password)', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const existingUser = { id: 1, ...userData, password: 'hashedPassword' };

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(existingUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(userData)).rejects.toThrow('Invalid credentials');
    });
  });
});