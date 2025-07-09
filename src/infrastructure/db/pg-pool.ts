import { Pool } from 'pg';

export const pgPool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'devuser',
  password: 'devpass',
  database: 'cleandb',
});
