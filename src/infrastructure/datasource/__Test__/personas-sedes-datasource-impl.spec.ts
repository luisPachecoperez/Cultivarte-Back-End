import { PersonasSedesDataSourceImpl } from '../personas-sedes-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('PersonasSedesDataSourceImpl', () => {
  let dataSource: PersonasSedesDataSourceImpl;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    dataSource = new PersonasSedesDataSourceImpl();
    jest.clearAllMocks();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('getAll retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_personas_sede: '1' }] });
    const result = await dataSource.getAll(1,100);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_personas_sede', '1');
  });

  it('getAll retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getAll(1,100);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener personas sedes: DB error');
    }
  });

  it('getById retorna personaSede correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_personas_sede: '1' }] });
    const result = await dataSource.getById('1');
    expect(result).toHaveProperty('id_personas_sede', '1');
  });

  it('getById retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getById('1');
    expect(result).toBeNull();
  });

  it('getById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getById('1');
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener persona sede: DB error');
    }
  });

  it('create retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({});
    const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
    const result = await dataSource.create(personaSede as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/creada correctamente/);
  });

  it('create retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
    const result = await dataSource.create(personaSede as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al crear persona sede: DB error');
  });

  it('updateById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({});
    const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
    const result = await dataSource.updateById('1', personaSede as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/actualizada correctamente/);
  });

  it('updateById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
    const result = await dataSource.updateById('1', personaSede as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al actualizar persona sede: DB error');
  });

  it('deleteById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({});
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/eliminada correctamente/);
  });

  it('deleteById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al eliminar persona sede: DB error');
  });

  it('getAll retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
  const result = await dataSource.getAll(1,100);
  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener personas sedes:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('getById retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.getById('1');
  expect(result).toBeNull();
});

it('getById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock)
    .mockRejectedValueOnce({ custom: 'fail' })
    .mockResolvedValueOnce({ rows: [] });
  const result = await dataSource.getById('1');
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al obtener persona sede:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('create retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock)
    .mockRejectedValueOnce({ custom: 'fail' })
    .mockResolvedValueOnce({ rows: [] });
  const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
  const result = await dataSource.create(personaSede as any);
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/Error al crear persona sede:/);
  expect(result.mensaje).toMatch(/custom/);
});

it('updateById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock)
    .mockRejectedValueOnce({ custom: 'fail' })
    .mockResolvedValueOnce({ rows: [] });
  const personaSede = { id_personas_sede: '1', id_persona: '2', id_sede: '3' };
  const result = await dataSource.updateById('1', personaSede as any);
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/Error al actualizar persona sede:/);
  expect(result.mensaje).toMatch(/custom/);
});

it('deleteById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock)
    .mockRejectedValueOnce({ custom: 'fail' })
    .mockResolvedValueOnce({ rows: [] });
  const result = await dataSource.deleteById('1');
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/Error al eliminar persona sede:/);
  expect(result.mensaje).toMatch(/custom/);
});
});