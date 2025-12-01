"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDbPool = exports.initDbPool = exports.pgPool = void 0;
const pg_1 = require("pg");
exports.pgPool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
const initDbPool = () => {
    exports.pgPool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
    });
    return exports.pgPool
        .query('SELECT NOW()')
        .then(() => console.log('Database connection established'))
        .catch((err) => console.error('Database connection error', err));
};
exports.initDbPool = initDbPool;
const closeDbPool = async () => {
    console.log('Closing database pool...');
    await exports.pgPool.end();
    console.log('Database pool closed');
};
exports.closeDbPool = closeDbPool;
//# sourceMappingURL=pg-pool.js.map