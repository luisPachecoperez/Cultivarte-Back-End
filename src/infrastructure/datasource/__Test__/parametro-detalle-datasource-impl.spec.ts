import { ParametroDetalleDataSourceImpl } from '../parametro-detalle-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pg-pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('ParametroDetalleDataSourceImpl', () => {
  let dataSource: ParametroDetalleDataSourceImpl;

  beforeEach(() => {
    dataSource = new ParametroDetalleDataSourceImpl();
    jest.clearAllMocks();
  });

  it('getAll retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_parametro_detalle: '1' }] });
    const result = await dataSource.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_parametro_detalle', '1');
  });

  it('getById retorna detalle correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_parametro_detalle: '1' }] });
    const result = await dataSource.getById('1');
    expect(result).toHaveProperty('id_parametro_detalle', '1');
  });

  it('getById retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getById('1');
    expect(result).toBeNull();
  });

  it('getById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener parametro detalle: DB error/);
    } else {
      throw new Error('Expected result to be of type RespuestaGrap');
    }
  });

  it('create retorna detalle correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_parametro_detalle: '1' }] });
    const detalle = { id_parametro_general: 'g1', nombre: 'n', codigo: 'c', orden: 1, valores: 'v', estado: 'A' };
    const result = await dataSource.create(detalle as any);
    expect(result).toHaveProperty('id_parametro_detalle', '1');
  });

  it('create retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const detalle = { id_parametro_general: 'g1', nombre: 'n', codigo: 'c', orden: 1, valores: 'v', estado: 'A' };
    const result = await dataSource.create(detalle as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al crear parametro detalle: DB error/);
    } else {
      throw new Error('Expected result to be of type RespuestaGrap');
    }
  });

  it('updateById retorna detalle correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_parametro_detalle: '1' }] });
    const detalle = { nombre: 'n', codigo: 'c', orden: 1, valores: 'v', estado: 'A' };
    const result = await dataSource.updateById('1', detalle as any);
    expect(result).toHaveProperty('id_parametro_detalle', '1');
  });

  it('updateById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const detalle = { nombre: 'n', codigo: 'c', orden: 1, valores: 'v', estado: 'A' };
    const result = await dataSource.updateById('1', detalle as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al actualizar parametro detalle: DB error/);
    } else {
      throw new Error('Expected result to be of type RespuestaGrap');
    }
  });

  it('deleteById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({});
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/eliminado correctamente/);
  });

  it('deleteById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al eliminar parametro detalle: DB error/);
  });

  it('getById retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.getById('1');
  expect(result).toBeNull();
});

it('getById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getById('1');
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al obtener parametro detalle:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('create retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const detalle = { id_parametro_general: 'g1', nombre: 'n', codigo: 'c', orden: 1, valores: 'v', estado: 'A' };
  const result = await dataSource.create(detalle as any);
  expect(result).toBeNull();
});

it('create retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const detalle = { id_parametro_general: 'g1', nombre: 'n', codigo: 'c', orden: 1, valores: 'v', estado: 'A' };
  const result = await dataSource.create(detalle as any);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al crear parametro detalle:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('updateById retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const detalle = { nombre: 'n', codigo: 'c', orden: 1, valores: 'v', estado: 'A' };
  const result = await dataSource.updateById('1', detalle as any);
  expect(result).toBeNull();
});

it('updateById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const detalle = { nombre: 'n', codigo: 'c', orden: 1, valores: 'v', estado: 'A' };
  const result = await dataSource.updateById('1', detalle as any);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al actualizar parametro detalle:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('deleteById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.deleteById('1');
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/Error al eliminar parametro detalle:/);
  expect(result.mensaje).toMatch(/custom/);
});
});