import { Pool } from 'pg';

export const pgPool = new Pool({
  host: '209.151.149.65',
  port: 17873,
  user: 'avnadmin',
  password: 'AVNS_I8LEBN1f5ENDdq_-a3P',
  database: 'defaultdb',
  ssl: {
    rejectUnauthorized: false // ← necesario para conexiones con SSL (modo 'require')
  }
});