import { Pool } from 'pg';
export declare const pgPool: Pool;
export declare const initDbPool: () => Promise<void>;
export declare const closeDbPool: () => Promise<void>;
