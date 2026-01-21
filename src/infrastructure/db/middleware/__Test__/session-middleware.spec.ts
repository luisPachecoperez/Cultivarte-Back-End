import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

const getSecretMock = jest.fn<Promise<string | undefined>, [string]>();
const jwtVerifyMock = jest.fn();

jest.mock('../../../../interfaces/services/secrets.service', () => ({
  secretService: {
    getSecret: getSecretMock,
  },
}));

jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  default: {
    verify: jwtVerifyMock,
  },
  verify: jwtVerifyMock,
}));

type MiddlewareFn = (typeof import('../session-middleware'))['rs256AuthMiddleware'];

const buildResponse = () => {
  const res = {} as Response & {
    statusCode?: number;
    body?: unknown;
  };

  res.status = jest.fn().mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });

  res.json = jest.fn().mockImplementation((payload: unknown) => {
    res.body = payload;
    return res;
  });

  return res;
};

describe('rs256AuthMiddleware', () => {
  let rs256AuthMiddleware: MiddlewareFn;

  beforeEach(async () => {
    jest.resetModules();
    jest.clearAllMocks();
    getSecretMock.mockReset();
    jwtVerifyMock.mockReset();
    ({ rs256AuthMiddleware } = await import('../session-middleware'));
  });

  it('returns 401 when token is missing', async () => {
    const req = {
      cookies: {},
      headers: {},
    } as unknown as Request;

    const res = buildResponse();
    const next = jest.fn();

    await rs256AuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token requerido' });
    expect(next).not.toHaveBeenCalled();
    expect(getSecretMock).not.toHaveBeenCalled();
  });

  it('returns 401 when verification key is unavailable', async () => {
    getSecretMock.mockResolvedValueOnce(undefined).mockResolvedValueOnce(undefined);

    const req = {
      cookies: {},
      headers: {
        authorization: 'Bearer sample-token',
      },
    } as unknown as Request;

    const res = buildResponse();
    const next = jest.fn();

    await rs256AuthMiddleware(req, res, next);

    expect(getSecretMock).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido o expirado' });
    expect(next).not.toHaveBeenCalled();
  });

  it('assigns token and payload when verification succeeds', async () => {
    getSecretMock.mockResolvedValueOnce('public-key-line-1\\npublic-key-line-2');
    const decodedPayload: JwtPayload = { sub: 'user-123' };
    jwtVerifyMock.mockReturnValue(decodedPayload);

    const req = {
      cookies: {
        __SESSION_AUTH__: 'valid-token',
      },
      headers: {},
    } as unknown as Request & {
      authToken?: string;
      authPayload?: JwtPayload;
    };

    const res = buildResponse();
    const next = jest.fn();

    await rs256AuthMiddleware(req, res, next);

    expect(getSecretMock).toHaveBeenCalledTimes(1);
    expect(jwtVerifyMock).toHaveBeenCalledWith(
      'valid-token',
      'public-key-line-1\npublic-key-line-2',
      { algorithms: ['RS256'] },
    );
    expect(req.authToken).toBe('valid-token');
    expect(req.authPayload).toEqual(decodedPayload);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('returns 401 when token payload is invalid', async () => {
    getSecretMock.mockResolvedValueOnce('public-key');
    jwtVerifyMock.mockReturnValue('invalid-payload');

    const req = {
      cookies: {
        __SESSION_AUTH__: 'invalid-token',
      },
      headers: {},
    } as unknown as Request;

    const res = buildResponse();
    const next = jest.fn();

    await rs256AuthMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido o expirado' });
    expect(next).not.toHaveBeenCalled();
  });
});
