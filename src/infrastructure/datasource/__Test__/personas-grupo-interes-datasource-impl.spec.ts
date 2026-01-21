import { PersonasGrupoInteresDataSourceImpl } from '../personas-grupo-interes-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('PersonasGrupoInteresDataSourceImpl', () => {
  let dataSource: PersonasGrupoInteresDataSourceImpl;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    dataSource = new PersonasGrupoInteresDataSourceImpl();
    jest.clearAllMocks();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('create retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Creada' }] });
    const persona = { id_persona: '1' };
    const result = await dataSource.create(persona as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Creada/);
  });

  it('create retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const persona = { id_persona: '1' };
    const result = await dataSource.create(persona as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo crear persona/);
  });

  it('create retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const persona = { id_persona: '1' };
    const result = await dataSource.create(persona as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al crear persona: DB error');
  });

  it('updateById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Actualizada' }] });
    const persona = { id_persona: '1' };
    const result = await dataSource.updateById('1', persona as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Actualizada/);
  });

  it('updateById retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const persona = { id_persona: '1' };
    const result = await dataSource.updateById('1', persona as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar persona/);
  });

  it('updateById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const persona = { id_persona: '1' };
    const result = await dataSource.updateById('1', persona as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al actualizar persona: DB error');
  });

  it('deleteById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Eliminada' }] });
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Eliminada/);
  });

  it('deleteById retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo eliminar persona/);
  });

  it('deleteById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al eliminar persona: DB error');
  });

  it('getAll retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona_grupo_interes: '1' }] });
    const result = await dataSource.getAll(1,100);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona_grupo_interes', '1');
  });

  it('getAll retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getAll(1,100);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener personas: DB error');
    }
  });

  it('getById retorna persona correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona_grupo_interes: '1' }] });
    const result = await dataSource.getById('1');
    expect(result).toHaveProperty('id_persona_grupo_interes', '1');
  });

  it('getById retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Persona no encontrada/);
    } else {
      fail('Expected result to have property exitoso');
    }
  });

  it('getById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener persona: DB error');
    } else {
      fail('Expected result to have property exitoso');
    }
  });

  it('create retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const persona = { id_persona: '1' };
  const result = await dataSource.create(persona as any);
  expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al crear persona:/);
  expect(result.mensaje).toMatch(/custom/);
});

it('create retorna fallback si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const persona = { id_persona: '1' };
  const result = await dataSource.create(persona as any);
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo crear persona/);
});

it('updateById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const persona = { id_persona: '1' };
  const result = await dataSource.updateById('1', persona as any);
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/Error al actualizar persona:/);
  expect(result.mensaje).toMatch(/custom/);
});

it('updateById retorna fallback si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const persona = { id_persona: '1' };
  const result = await dataSource.updateById('1', persona as any);
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo actualizar persona/);
});

it('deleteById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.deleteById('1');
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/Error al eliminar persona:/);
  expect(result.mensaje).toMatch(/custom/);
});

it('deleteById retorna fallback si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.deleteById('1');
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo eliminar persona/);
});

it('getAll retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getAll(1,100);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al obtener personas:/);
    expect(result.mensaje).toMatch(/custom/);
  } else {
    fail('Expected result to have property exitoso');
  }
});

it('getById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getById('1');
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al obtener persona:/);
    expect(result.mensaje).toMatch(/custom/);
  } else {
    fail('Expected result to have property exitoso');
  } 
});

it('getById retorna fallback si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.getById('1');
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Persona no encontrada/);
  } else {
    fail('Expected result to have property exitoso');
  }
});
});