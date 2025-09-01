import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
export const pgPool = new Pool({
  
  host: 'fbd-orlandojvasquez74-6861.g.aivencloud.com',
  port: 17873,
  user: 'avnadmin',
  password: 'AVNS_I8LEBN1f5ENDdq_-a3P',
  database: 'defaultdb',
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(path.join(__dirname, '../../../certs/ca.pem')).toString()
  }

});