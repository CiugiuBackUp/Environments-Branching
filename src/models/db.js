import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

const connection = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
});

export const query = (sql, params) => {
  return connection.execute(sql, params);
};
