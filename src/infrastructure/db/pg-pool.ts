import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Create a new pool with optimized settings
export const pgPool = new Pool({
  host: 'fbd-orlandojvasquez74-6861.g.aivencloud.com',
  port: 17873,
  user: 'avnadmin',
  password: 'AVNS_I8LEBN1f5ENDdq_-a3P',
  database: 'defaultdb',
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(path.join(__dirname, '../../../certs/ca.pem')).toString()
  },
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 5000, // Return an error after 5 seconds if connection could not be established
  maxUses: 7500, // Close and replace a connection after it has been used this many times
});

// Handle pool errors
export const initDbPool = () => {
  pgPool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    // Don't crash the app on pool errors, but log them
  });
  
  // Test the connection
  return pgPool.query('SELECT NOW()')
    .then(() => console.log('Database connection established'))
    .catch(err => console.error('Database connection error', err));
};

// Graceful shutdown
export const closeDbPool = async () => {
  console.log('Closing database pool...');
  await pgPool.end();
  console.log('Database pool closed');
};