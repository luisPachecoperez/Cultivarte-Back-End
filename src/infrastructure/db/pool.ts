import { Pool, QueryResult, PoolClient } from 'pg';
import { SecretService } from '../../interfaces/services/secrets.service';

let realPool: Pool | null = null;
let poolInitializationPromise: Promise<Pool> | null = null;
let errorHandlerRegistered = false;

const isTestEnvironment = (): boolean =>
  process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined;

type QueryCallback = (err: Error | null, queryResult: QueryResult) => void;

const isQueryCallback = (value: unknown): value is QueryCallback =>
  typeof value === 'function';

async function initializePool(): Promise<Pool> {
  if (isTestEnvironment()) {
    const fakeQueryImpl = (...args: unknown[]): Promise<QueryResult> => {
      const result = { rows: [] } as QueryResult;
      const maybeCallback = args.at(-1);
      if (isQueryCallback(maybeCallback)) {
        maybeCallback(null, result);
      }
      return Promise.resolve(result);
    };
    const fakeQuery = fakeQueryImpl as Pool['query'];

    const fakePool: Partial<Pool> = {};

    const fakeClient: Partial<PoolClient> = {
      query: fakeQuery as unknown as PoolClient['query'],
      release: () => undefined,
    };

    fakePool.query = fakeQuery;
    fakePool.connect = (() =>
      Promise.resolve(fakeClient as PoolClient)) as Pool['connect'];
    fakePool.on = ((...args: Parameters<Pool['on']>) => {
      const listener = args[1];
      if (typeof listener === 'function') {
        // pretend to register listener for parity with pg.Pool
      }
      return fakePool as Pool;
    }) as Pool['on'];
    fakePool.end = (() => Promise.resolve()) as Pool['end'];

    realPool = fakePool as Pool;
    return realPool;
  }

  const secretService = new SecretService();

  const host = await secretService.getSecret('fbol_db_host');
  const port = await secretService.getSecret('fbol_db_port');
  const user = await secretService.getSecret('fbol_db_user');
  const password = await secretService.getSecret('fbol_db_password');
  const dbName = await secretService.getSecret('fbol_db_name');

  realPool = new Pool({
    host: host || process.env.DB_HOST || 'localhost',
    port: Number(port || process.env.DB_PORT || '5432'),
    user: user || process.env.DB_USER || 'postgres',
    password: password || process.env.DB_PASSWORD || '',
    database: dbName || process.env.DB_NAME || 'eventos',
  });

  console.log('PG Pool initialized');
  return realPool;
}

async function ensurePoolInitialized(): Promise<Pool> {
  if (realPool) {
    return realPool;
  }

  poolInitializationPromise ??= initializePool();
  realPool = await poolInitializationPromise;
  return realPool;
}

type PoolEvent = Parameters<Pool['on']>[0];
type PoolListener = Parameters<Pool['on']>[1];

interface CustomPool {
  query<T = unknown>(text: string, params?: any[]): Promise<QueryResult<T>>;
  connect(): Promise<PoolClient>;
  on(event: PoolEvent, listener: PoolListener): Promise<void>;
  end(): Promise<void>;
}

export const pgPool: CustomPool = {
  async query<T = unknown>(
    text: string,
    params?: any[],
  ): Promise<QueryResult<T>> {
    const pool = await ensurePoolInitialized();
    return pool.query<T>(text, params);
  },

  async connect(): Promise<PoolClient> {
    const pool = await ensurePoolInitialized();
    return pool.connect();
  },

  async on(event: PoolEvent, listener: PoolListener): Promise<void> {
    const pool = await ensurePoolInitialized();
    pool.on(event, listener);
  },

  async end(): Promise<void> {
    if (!realPool) {
      return;
    }

    await realPool.end();
    realPool = null;
    poolInitializationPromise = null;
    errorHandlerRegistered = false;
  },
};

export const initDbPool = async (): Promise<void> => {
  const pool = await ensurePoolInitialized();

  if (!errorHandlerRegistered) {
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
    errorHandlerRegistered = true;
  }

  try {
    await pool.query('SELECT NOW()');
    console.log('Database connection established');
  } catch (err) {
    console.error('Database connection error', err);
  }
};

export const closeDbPool = async (): Promise<void> => {
  if (!realPool) {
    return;
  }

  console.log('Closing database pool...');
  await realPool.end();
  console.log('Database pool closed');
  realPool = null;
  poolInitializationPromise = null;
  errorHandlerRegistered = false;
};

export const __resetPoolForTests = (): void => {
  realPool = null;
  poolInitializationPromise = null;
  errorHandlerRegistered = false;
};
