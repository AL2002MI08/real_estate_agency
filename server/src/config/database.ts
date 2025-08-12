import { DataSource } from 'typeorm';
import { User } from '../entities/User.entity';
import { Residency } from '../entities/residency.entity';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Residency],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});


export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully!');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};