import { CalendarioFechaDataSourceImpl } from '../calendario-fecha-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('CalendarioFechaDataSourceImpl homologation', () => {
  let dataSource: CalendarioFechaDataSourceImpl;

  beforeEach(() => {
    dataSource = new CalendarioFechaDataSourceImpl();
    jest.clearAllMocks();
  });

  it('retorna mensaje homologado cuando getByDate falla y existe parametrización', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [{ mensaje: 'Mensaje homologado' }] });

    const result = await dataSource.getByDate({} as any);

    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe(
        'Error al obtener eventos por fecha: Mensaje homologado',
      );
    } else {
      throw new Error('Expected error response');
    }
  });

  describe('helpers', () => {
    it('normaliza valores en getErrorText', () => {
      const circular: any = {};
      circular.self = circular;

      const getErrorText = (dataSource as any).getErrorText.bind(dataSource);

      expect(getErrorText(new Error('boom'))).toBe('boom');
      expect(getErrorText('texto')).toBe('texto');
      expect(getErrorText(123)).toBe('123');
      expect(getErrorText(false)).toBe('false');
      expect(getErrorText(undefined)).toBe('undefined');
      expect(getErrorText({ foo: 'bar' })).toBe('{"foo":"bar"}');
      expect(getErrorText(circular)).toContain('[Circular');
    });

    it('usa mensaje del client cuando existe parametrización', async () => {
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

    it('consulta el pool cuando el client retorna vacío', async () => {
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

    it('retorna texto original cuando no hay coincidencia y el pool falla', async () => {
      const client = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
      };
      (pgPool.query as jest.Mock).mockRejectedValue(new Error('Pool error'));

      const result = await (dataSource as any).resolveHomologatedMessage(
        'Sin homologación',
        client,
      );

      expect(result).toBe('Sin homologación');
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(pgPool.query).toHaveBeenCalledTimes(1);
    });

    it('sale temprano cuando el texto está vacío', async () => {
      const result = await (dataSource as any).resolveHomologatedMessage('');

      expect(result).toBe('');
      expect(pgPool.query).not.toHaveBeenCalled();
    });

    it('buildErrorMessage aplica el prefijo y mensaje homologado', async () => {
      (pgPool.query as jest.Mock).mockResolvedValue({
        rows: [{ mensaje: 'Homologado' }],
      });

      const message = await (dataSource as any).buildErrorMessage(
        'Prefijo: ',
        new Error('Original'),
      );

      expect(message).toBe('Prefijo: Homologado');
      expect(pgPool.query).toHaveBeenCalledTimes(1);
    });
  });
});
