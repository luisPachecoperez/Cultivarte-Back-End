import { CalendarioFechaDataSourceImpl } from '../calendario-fecha-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('CalendarioFechaDataSourceImpl', () => {
  let dataSource: CalendarioFechaDataSourceImpl;

  beforeEach(() => {
    dataSource = new CalendarioFechaDataSourceImpl();
    jest.clearAllMocks();
  });

  it('getByDate retorna eventos correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_evento: 'e1' }] });
    const input = { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31' };
    const result = await dataSource.getByDate(input as any);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_evento', 'e1');
  });

  it('getByDate retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [{ mensaje: 'Error homologado' }] });
    const input = { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31' };
    const result = await dataSource.getByDate(input as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe(
        'Error al obtener eventos por fecha: Error homologado',
      );
    }
  });

  it('getByDate retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const input = { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31' };
    const result = await dataSource.getByDate(input as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      if ('mensaje' in result) {
        expect(result.mensaje).toBe(
          'Error al obtener eventos por fecha: {"custom":"fail"}',
        );
      }
    }
  });
});