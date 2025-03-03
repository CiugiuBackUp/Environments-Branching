import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE
  // host: "localhost",
  // user: "root",
  // password: "123456",
  // database: "softwareintegration"
});

export const query = (sql, params) => {
  return connection.execute(sql, params);
};
