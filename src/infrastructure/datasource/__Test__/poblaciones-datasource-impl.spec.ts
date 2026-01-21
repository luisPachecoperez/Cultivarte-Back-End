import { PoblacionDataSourceImpl } from '../poblaciones-datasource-impl';
import { pgPool } from '../../db/pool';

type PgQueryMock = jest.Mock;

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('PoblacionDataSourceImpl', () => {
  let dataSource: PoblacionDataSourceImpl;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const queryMock = pgPool.query as PgQueryMock;

  beforeEach(() => {
    dataSource = new PoblacionDataSourceImpl();
    jest.clearAllMocks();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('getPoblaciones retorna lista correctamente', async () => {
    queryMock.mockResolvedValue({ rows: [{ id_poblacion: '1' }] });
    const result = await dataSource.getPoblaciones();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_poblacion', '1');
  });

  it('getPoblaciones retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getPoblaciones();
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener poblaciones: DB error');
    }
  });

  it('getPoblacionById retorna población correctamente', async () => {
    queryMock.mockResolvedValue({ rowCount: 1, rows: [{ id_poblacion: '1' }] });
    const result = await dataSource.getPoblacionById('1');
    expect(result).toHaveProperty('id_poblacion', '1');
  });

  it('getPoblacionById retorna error si rowCount es 0', async () => {
    queryMock.mockResolvedValue({ rowCount: 0, rows: [] });
    const result = await dataSource.getPoblacionById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se encontró la población/);
    }
  });

  it('getPoblacionById retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getPoblacionById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener la población: DB error');
    }
  });

  it('createPoblacion retorna éxito correctamente', async () => {
    queryMock.mockResolvedValue({ rows: [{}] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.createPoblacion(poblacion as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/creada exitosamente/);
  });

  it('createPoblacion retorna error si no hay resultado', async () => {
    queryMock.mockResolvedValue({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.createPoblacion(poblacion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo crear la población/);
  });

  it('createPoblacion retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.createPoblacion(poblacion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al crear la población: DB error');
  });

  it('updatePoblacionById retorna éxito correctamente', async () => {
    queryMock.mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Actualizada' }] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.updatePoblacionById('1', poblacion as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Actualizada/);
  });

  it('updatePoblacionById retorna null si no hay resultado', async () => {
    queryMock.mockResolvedValue({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.updatePoblacionById('1', poblacion as any);
    expect(result).toBeNull();
  });

  it('updatePoblacionById retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.updatePoblacionById('1', poblacion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al actualizar la población: DB error');
  });

  it('deletePoblacionById retorna éxito correctamente', async () => {
    queryMock.mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Eliminada' }] });
    const result = await dataSource.deletePoblacionById('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Eliminada/);
  });

  it('deletePoblacionById retorna null si no hay resultado', async () => {
    queryMock.mockResolvedValue({ rows: [] });
    const result = await dataSource.deletePoblacionById('1');
    expect(result).toBeNull();
  });

  it('deletePoblacionById retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.deletePoblacionById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al eliminar la población: DB error');
  });

  it('getPoblaciones retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getPoblaciones();
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener poblaciones:/);
      expect(result.mensaje).toMatch(/custom/);
    }
  });

  it('getPoblacionById retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getPoblacionById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener la población:/);
      expect(result.mensaje).toMatch(/custom/);
    }
  });

  it('createPoblacion retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.createPoblacion(poblacion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al crear la población:/);
    expect(result.mensaje).toMatch(/custom/);
  });

  it('createPoblacion retorna error si rows[0] es undefined', async () => {
    queryMock.mockResolvedValue({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.createPoblacion(poblacion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo crear la población/);
  });

  it('updatePoblacionById retorna null si rows[0] es undefined', async () => {
    queryMock.mockResolvedValue({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.updatePoblacionById('1', poblacion as any);
    expect(result).toBeNull();
  });

  it('updatePoblacionById retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.updatePoblacionById('1', poblacion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al actualizar la población:/);
    expect(result.mensaje).toMatch(/custom/);
  });

  it('deletePoblacionById retorna null si rows[0] es undefined', async () => {
    queryMock.mockResolvedValue({ rows: [] });
    const result = await dataSource.deletePoblacionById('1');
    expect(result).toBeNull();
  });

  it('deletePoblacionById retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.deletePoblacionById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al eliminar la población:/);
    expect(result.mensaje).toMatch(/custom/);
  });
});