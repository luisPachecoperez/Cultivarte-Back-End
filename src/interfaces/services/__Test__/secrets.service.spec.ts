const accessSecretVersionMock = jest.fn();

jest.mock('@google-cloud/secret-manager', () => ({
  SecretManagerServiceClient: jest.fn().mockImplementation(() => ({
    accessSecretVersion: accessSecretVersionMock,
  })),
}));

jest.mock('../../../environment/environment', () => ({
  environment: {
    fbol_db_host: 'mock-host',
  },
}));

import { SecretService } from '../secrets.service';
import { environment } from '../../../environment/environment';

const envRecord = environment as Record<string, string>;

describe('SecretService', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    accessSecretVersionMock.mockReset();
    process.env = { ...ORIGINAL_ENV };
    envRecord.fbol_db_host = 'local-db-host';
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('devuelve el valor local cuando NODE_ENV=desarrollo', async () => {
    process.env.NODE_ENV = 'desarrollo';
  envRecord.fbol_db_host = 'desde-local';

    const service = new SecretService();

    const value = await service.getSecret('fbol_db_host');

    expect(value).toBe('desde-local');
    expect(accessSecretVersionMock).not.toHaveBeenCalled();
  });

  it('consulta Secret Manager cuando no es desarrollo', async () => {
    process.env.NODE_ENV = 'produccion';
    process.env.GOOGLE_CLOUD_PROJECT = 'proyecto-123';
    accessSecretVersionMock.mockResolvedValueOnce([
      { payload: { data: Buffer.from('valor-secreto') } },
    ]);

    const service = new SecretService();

    const value = await service.getSecret('mi-secreto');

    expect(accessSecretVersionMock).toHaveBeenCalledWith({
      name: 'projects/proyecto-123/secrets/mi-secreto/versions/latest',
    });
    expect(value).toBe('valor-secreto');
  });

  it('retorna undefined si Secret Manager lanza un error no Error', async () => {
    process.env.NODE_ENV = 'produccion';
    process.env.GOOGLE_CLOUD_PROJECT = 'proyecto-123';
    accessSecretVersionMock.mockRejectedValueOnce('fallo');

    const service = new SecretService();

    const value = await service.getSecret('otro-secreto');

    expect(value).toBeUndefined();
  });
});
