import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Task } from './entities/Task';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [User, Task],
    migrations: [__dirname + "/migrations/*.ts"],
    subscribers: [],
})
