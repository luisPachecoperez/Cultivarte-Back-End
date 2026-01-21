import { pgPool, initDbPool, closeDbPool, __resetPoolForTests } from '../pool';

const mockQuery = jest.fn();
const mockConnect = jest.fn();
const mockOn = jest.fn();
const mockEnd = jest.fn();

const mockPoolInstance = {
  query: mockQuery,
  connect: mockConnect,
  on: mockOn,
  end: mockEnd,
};

jest.mock('pg', () => ({
  Pool: jest.fn((config: unknown) => {
    void config;
    return mockPoolInstance;
  }),
}));

const { Pool: PoolMock } = jest.requireMock('pg');

const mockGetSecret = jest.fn();

jest.mock('../../../interfaces/services/secrets.service', () => ({
  SecretService: jest.fn().mockImplementation(() => ({
    getSecret: mockGetSecret,
  })),
}));

describe('pgPool', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...OLD_ENV };
    delete process.env.JEST_WORKER_ID;
    process.env.NODE_ENV = 'development';
    mockGetSecret.mockImplementation(async () => undefined);
    mockQuery.mockResolvedValue({ rows: [] });
    mockEnd.mockResolvedValue(undefined);
    __resetPoolForTests();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('registers error handler and runs health check on init', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await initDbPool();

    expect(mockOn).toHaveBeenCalledWith('error', expect.any(Function));
    expect(mockQuery).toHaveBeenCalledWith('SELECT NOW()');

    logSpy.mockRestore();
  });

  it('logs unexpected errors triggered by the pool', async () => {
    const error = new Error('Pool error');
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await initDbPool();

  const listenerEntry = mockOn.mock.calls.find(([event]) => event === 'error');
  expect(listenerEntry).toBeDefined();

  const listener = listenerEntry![1] as (err: Error) => void;
  listener(error);

    expect(errorSpy).toHaveBeenCalledWith('Unexpected error on idle client', error);
    errorSpy.mockRestore();
  });

  it('logs connection errors when health check fails', async () => {
    const error = new Error('Connection failed');
    mockQuery.mockRejectedValueOnce(error);
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await initDbPool();

    expect(errorSpy).toHaveBeenCalledWith('Database connection error', error);
    errorSpy.mockRestore();
  });

  it('closes the pool gracefully', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await initDbPool();
    await closeDbPool();

    expect(mockEnd).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Closing database pool...');
    expect(logSpy).toHaveBeenCalledWith('Database pool closed');
    logSpy.mockRestore();
  });

  it('delegates query execution to the underlying pool', async () => {
    const resultMock = { rows: [{ now: '2024-01-01' }] };
    mockQuery.mockResolvedValueOnce(resultMock);

    const result = await pgPool.query('SELECT NOW()');

    expect(PoolMock).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith('SELECT NOW()', undefined);
    expect(result).toBe(resultMock);
  });

  it('provides a stubbed pool when running in test environment', async () => {
    process.env.NODE_ENV = 'test';
    delete process.env.JEST_WORKER_ID;
    __resetPoolForTests();

    const queryResult = await pgPool.query('SELECT 1');
    expect(queryResult).toEqual({ rows: [] });

    const client = await pgPool.connect();
    expect(typeof client.release).toBe('function');
    client.release();

    const listener = jest.fn();
  await pgPool.on('error' as any, listener);
    expect(listener).not.toHaveBeenCalled();

    await pgPool.end();
    await pgPool.end();
    expect(mockEnd).not.toHaveBeenCalled();

    __resetPoolForTests();
    await closeDbPool();
  });

  it('uses default port when DB_PORT is not defined', async () => {
    delete process.env.DB_PORT;
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'postgres';
    process.env.DB_PASSWORD = 'postgres';
    process.env.DB_NAME = 'postgres';

    await initDbPool();

    expect(PoolMock.mock.calls[0]).toBeDefined();
    const callArgs = PoolMock.mock.calls[0]![0] as { port: number };
    expect(callArgs.port).toBe(5432);
  });

  it('uses provided DB_PORT value', async () => {
    process.env.DB_PORT = '5433';
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'postgres';
    process.env.DB_PASSWORD = 'postgres';
    process.env.DB_NAME = 'postgres';

    await initDbPool();

    expect(PoolMock.mock.calls[0]).toBeDefined();
    const callArgs = PoolMock.mock.calls[0]![0] as { port: number };
    expect(callArgs.port).toBe(5433);
  });
});
