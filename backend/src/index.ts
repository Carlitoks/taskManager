import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
import cors from 'cors';
import logger from './utils/logger';

AppDataSource.initialize().then(() => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());
  app.use('/api', routes);

  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
}).catch(error => {
  logger.error('Error during Data Source initialization:', error);
});