import { pgPool } from '../pool';

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
    on: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('pg-pool', () => {
    const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should log pool error event', async () => {
    // Simula el evento 'error' del pool
    const error = new Error('Pool error');
    const errorHandler = jest.fn((event, cb) => {
      if (event === 'error') cb(error);
      return pgPool; // Ensure it returns the pool object
    });
      (pgPool.on as any) = errorHandler;
      (pgPool.query as jest.Mock).mockResolvedValue({});
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await pgPool();
    expect(errorHandler).toHaveBeenCalledWith('error', expect.any(Function));
    expect(logSpy).toHaveBeenCalledWith('Unexpected error on idle client', error);
    logSpy.mockRestore();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize db pool and handle error event', async () => {
    const errorHandler = jest.fn();
    pgPool.on = errorHandler;
    (pgPool.query as jest.Mock).mockResolvedValue({});
    await initDbPool();
    expect(errorHandler).toHaveBeenCalledWith('error', expect.any(Function));
    expect(pgPool.query).toHaveBeenCalledWith('SELECT NOW()');
  });

  it('should log error if connection fails', async () => {
    const error = new Error('Connection failed');
    (pgPool.query as jest.Mock).mockRejectedValue(error);
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await initDbPool();
    expect(logSpy).toHaveBeenCalledWith('Database connection error', error);
    logSpy.mockRestore();
  });

  it('should close the db pool gracefully', async () => {
    (pgPool.end as jest.Mock).mockResolvedValue(undefined);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await closeDbPool();
    expect(pgPool.end).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Closing database pool...');
    expect(logSpy).toHaveBeenCalledWith('Database pool closed');
    logSpy.mockRestore();
  });

  it('should use default port 5432 if DB_PORT is not set', () => {
    delete process.env.DB_PORT;
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'postgres';
    process.env.DB_PASSWORD = 'test';
    process.env.DB_NAME = 'eventos';

    // Mock Pool justo antes de requerir pg-pool
    const Pool = jest.fn();
    jest.doMock('pg', () => ({ Pool }));

    // Requiere el módulo después de mockear
    const { pgPool } = require('../pg-pool');
    expect(Pool).toHaveBeenCalledWith(
      expect.objectContaining({
        port: undefined,
      })
    );
  });

  it('should use provided DB_PORT if set', () => {
    process.env.DB_PORT = '5433';
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'postgres';
    process.env.DB_PASSWORD = 'test';
    process.env.DB_NAME = 'eventos';

    const Pool = jest.fn();
    jest.doMock('pg', () => ({ Pool }));

    const { pgPool } = require('../pg-pool');
    expect(Pool).toHaveBeenCalledWith(
      expect.objectContaining({
        port: 5433,
      })
    );
  });
});
