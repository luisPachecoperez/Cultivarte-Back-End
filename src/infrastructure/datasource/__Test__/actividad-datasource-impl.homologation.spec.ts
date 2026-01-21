import { ActividadDataSourceImpl } from '../actividad-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pool', () => ({
  pgPool: {
    connect: jest.fn(),
    query: jest.fn(),
  },
}));

describe('ActividadDataSourceImpl error homologation', () => {
  let dataSource: ActividadDataSourceImpl;

  beforeEach(() => {
    dataSource = new ActividadDataSourceImpl();
    jest.clearAllMocks();
  });

  it('retorna mensaje homologado cuando getAll falla y existe parametrización', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [{ mensaje: 'Error homologado' }] });

    const result = await dataSource.getAll(10, 0);

    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe(
        'No se pudo obtener actividades: Error homologado',
      );
    } else {
      throw new Error('Expected error response');
    }
  });

  it('retorna mensaje homologado cuando createActividadAndSesiones falla y existe parametrización', async () => {
    const mockClient = {
      query: jest
        .fn()
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(new Error('DB error'))
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({ rows: [{ mensaje: 'Error homologado' }] }),
      release: jest.fn(),
    };
    (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);

    const result = await dataSource.createActividadAndSesiones({
      id_actividad: 'act1',
      fecha_actividad: '2023-01-01',
    } as any);

    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe(
        'No se pudo crear actividad: Error homologado',
      );
    } else {
      throw new Error('Expected error response');
    }

    expect(mockClient.query).toHaveBeenCalledTimes(4);
    expect(mockClient.release).toHaveBeenCalled();
  });

  describe('helpers', () => {
    it('normaliza múltiples tipos en getErrorText', () => {
      const circular: any = {};
      circular.self = circular;

      const getErrorText = (dataSource as any).getErrorText.bind(dataSource);

      expect(getErrorText(new Error('boom'))).toBe('boom');
      expect(getErrorText('simple')).toBe('simple');
      expect(getErrorText(42)).toBe('42');
      expect(getErrorText(true)).toBe('true');
      expect(getErrorText(undefined)).toBe('undefined');
      expect(getErrorText({ foo: 'bar' })).toBe('{"foo":"bar"}');
      expect(getErrorText(circular)).toContain('[Circular');
    });

    it('usa la conexión del client si retorna mensaje homologado', async () => {
      const client = {
        query: jest.fn().mockResolvedValue({ rows: [{ mensaje: 'Desde client' }] }),
      };

      const result = await (dataSource as any).resolveHomologatedMessage(
        'Original',
        client,
      );

      expect(result).toBe('Desde client');
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(pgPool.query).not.toHaveBeenCalled();
    });

    it('retorna mensaje del pool cuando client falla', async () => {
      const client = {
        query: jest.fn().mockRejectedValue(new Error('Client fail')),
      };
      (pgPool.query as jest.Mock).mockResolvedValue({
        rows: [{ mensaje: 'Desde pool' }],
      });

      const result = await (dataSource as any).resolveHomologatedMessage(
        'Original',
        client,
      );

      expect(result).toBe('Desde pool');
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(pgPool.query).toHaveBeenCalledTimes(1);
    });

    it('retorna mensaje del pool cuando client entrega string vacío', async () => {
      const client = {
        query: jest.fn().mockResolvedValue({ rows: [{ mensaje: '   ' }] }),
      };
      (pgPool.query as jest.Mock).mockResolvedValue({
        rows: [{ mensaje: 'Desde pool' }],
      });

      const result = await (dataSource as any).resolveHomologatedMessage(
        'Original',
        client,
      );

      expect(result).toBe('Desde pool');
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(pgPool.query).toHaveBeenCalledTimes(1);
    });

    it('retorna el texto original cuando no hay parametrización y el pool falla', async () => {
      const client = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
      };
      (pgPool.query as jest.Mock).mockRejectedValue(new Error('Pool fail'));

      const result = await (dataSource as any).resolveHomologatedMessage(
        'Sin mensaje',
        client,
      );

      expect(result).toBe('Sin mensaje');
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(pgPool.query).toHaveBeenCalledTimes(1);
    });

    it('regresa inmediatamente cuando el texto a homologar está vacío', async () => {
      const result = await (dataSource as any).resolveHomologatedMessage('');

      expect(result).toBe('');
      expect(pgPool.query).not.toHaveBeenCalled();
    });

    it('construye mensaje con prefijo usando buildErrorMessage', async () => {
      (pgPool.query as jest.Mock).mockResolvedValue({
        rows: [{ mensaje: 'Normalizado' }],
      });

      const message = await (dataSource as any).buildErrorMessage(
        'Prefijo: ',
        new Error('Original'),
      );

      expect(message).toBe('Prefijo: Normalizado');
      expect(pgPool.query).toHaveBeenCalledTimes(1);
    });
  });
});
