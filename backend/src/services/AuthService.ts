import { User } from '../entities/User';
import { AppDataSource } from '../data-source';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(userData: Partial<User>): Promise<User> {
    const { email, password } = userData;
    if (!email || !password) {
      logger.warn('Registration attempt with missing email or password');
      throw new Error('Email and password are required');
    }

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      logger.warn(`Registration attempt for existing user: ${email}`);
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ ...userData, password: hashedPassword });
    await this.userRepository.save(user);
    logger.info(`User registered successfully: ${user.email}`);
    return user;
  }

  async login(userData: Partial<User>): Promise<{ user: User, token: string }> {
    const { email, password } = userData;
    if (!email || !password) {
      logger.warn('Login attempt with missing email or password');
      throw new Error('Email and password are required');
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      logger.warn(`Login attempt for non-existent user: ${email}`);
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Login attempt with invalid password for user: ${email}`);
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    logger.info(`User logged in successfully: ${user.email}`);
    return { user, token };
  }
}