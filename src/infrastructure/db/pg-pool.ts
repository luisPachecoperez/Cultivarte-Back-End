import { Pool } from "pg";

// Create a new pool with optimized settings
export const pgPool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123456",
  database: "eventos",
});

// Handle pool errors
export const initDbPool = () => {
  pgPool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    // Don't crash the app on pool errors, but log them
  });

  // Test the connection
  return pgPool
    .query("SELECT NOW()")
    .then(() => console.log("Database connection established"))
    .catch((err) => console.error("Database connection error", err));
};

// Graceful shutdown
export const closeDbPool = async () => {
  console.log("Closing database pool...");
  await pgPool.end();
  console.log("Database pool closed");
};
