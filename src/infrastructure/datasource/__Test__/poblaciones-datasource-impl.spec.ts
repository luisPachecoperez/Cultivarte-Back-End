import { PoblacionDataSourceImpl } from '../poblaciones-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pg-pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('PoblacionDataSourceImpl', () => {
  let dataSource: PoblacionDataSourceImpl;

  beforeEach(() => {
    dataSource = new PoblacionDataSourceImpl();
    jest.clearAllMocks();
  });

  it('getPoblaciones retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_poblacion: '1' }] });
    const result = await dataSource.getPoblaciones();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_poblacion', '1');
  });

  it('getPoblaciones retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getPoblaciones();
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener poblaciones: DB error/);
    }
  });

  it('getPoblacionById retorna población correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rowCount: 1, rows: [{ id_poblacion: '1' }] });
    const result = await dataSource.getPoblacionById('1');
    expect(result).toHaveProperty('id_poblacion', '1');
  });

  it('getPoblacionById retorna error si rowCount es 0', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rowCount: 0, rows: [] });
    const result = await dataSource.getPoblacionById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se encontró la población/);
    }
  });

  it('getPoblacionById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getPoblacionById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener la población: DB error/);
    }
  });

  it('createPoblacion retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{}] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.createPoblacion(poblacion as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/creada exitosamente/);
  });

  it('createPoblacion retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.createPoblacion(poblacion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo crear la población/);
  });

  it('createPoblacion retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.createPoblacion(poblacion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo crear la población: DB error/);
  });

  it('updatePoblacionById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Actualizada' }] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.updatePoblacionById('1', poblacion as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Actualizada/);
  });

  it('updatePoblacionById retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.updatePoblacionById('1', poblacion as any);
    expect(result).toBeNull();
  });

  it('updatePoblacionById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const poblacion = { nombre: 'Población' };
    const result = await dataSource.updatePoblacionById('1', poblacion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar poblacion: DB error/);
  });

  it('deletePoblacionById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Eliminada' }] });
    const result = await dataSource.deletePoblacionById('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Eliminada/);
  });

  it('deletePoblacionById retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.deletePoblacionById('1');
    expect(result).toBeNull();
  });

  it('deletePoblacionById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.deletePoblacionById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo eliminar poblacion: DB error/);
  });

  it('getPoblaciones retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getPoblaciones();
  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo obtener poblaciones:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('getPoblacionById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getPoblacionById('1');
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al obtener la población:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('createPoblacion retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const poblacion = { nombre: 'Población' };
  const result = await dataSource.createPoblacion(poblacion as any);
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo crear la población:/);
  expect(result.mensaje).toMatch(/custom/);
});

it('createPoblacion retorna error si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const poblacion = { nombre: 'Población' };
  const result = await dataSource.createPoblacion(poblacion as any);
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo crear la población/);
});

it('updatePoblacionById retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const poblacion = { nombre: 'Población' };
  const result = await dataSource.updatePoblacionById('1', poblacion as any);
  expect(result).toBeNull();
});

it('updatePoblacionById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const poblacion = { nombre: 'Población' };
  const result = await dataSource.updatePoblacionById('1', poblacion as any);
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo actualizar poblacion:/);
  expect(result.mensaje).toMatch(/custom/);
});

it('deletePoblacionById retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.deletePoblacionById('1');
  expect(result).toBeNull();
});

it('deletePoblacionById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.deletePoblacionById('1');
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo eliminar poblacion:/);
  expect(result.mensaje).toMatch(/custom/);
});
});