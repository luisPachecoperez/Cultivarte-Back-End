import { CalendarioFechaDataSourceImpl } from '../calendario-fecha-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pg-pool', () => ({
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
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const input = { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31' };
    const result = await dataSource.getByDate(input as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener eventos por fecha: DB error/);
    }
  });

  it('getByDate retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const input = { fecha_inicial: '2023-01-01', fecha_final: '2023-01-31' };
    const result = await dataSource.getByDate(input as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      if ('mensaje' in result) {
        expect(result.mensaje).toMatch(/Error al obtener eventos por fecha:/);
        expect(result.mensaje).toMatch(/custom/);
      }
    }
    if ('exitoso' in result && 'mensaje' in result) {
      expect(result.mensaje).toMatch(/Error al obtener eventos por fecha:/);
      expect(result.mensaje).toMatch(/custom/);
    }
  });
});