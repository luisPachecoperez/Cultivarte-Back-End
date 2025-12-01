import { PersonaDataSourceImpl } from '../personas-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pg-pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('PersonaDataSourceImpl', () => {
  let dataSource: PersonaDataSourceImpl;

  beforeEach(() => {
    dataSource = new PersonaDataSourceImpl();
    jest.clearAllMocks();
  });

  it('getAll retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getAll(10, 0);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', '1');
  });

  it('getAll retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getAll(10, 0);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener personas: DB error/);
    }
  });

  it('getById retorna persona correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getById('1');
    expect(result).toHaveProperty('id_persona', '1');
  });

  it('getById retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getById('1');
    expect(result).toBeNull();
  });

  it('getById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getById('1');
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener persona: DB error/);
    }
  });

  it('createPersona retorna persona correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const persona = { id_persona: '1' };
    const result = await dataSource.createPersona(persona as any);
    expect(result).toHaveProperty('id_persona', '1');
  });

  it('createPersona retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const persona = { id_persona: '1' };
    const result = await dataSource.createPersona(persona as any);
    expect(result).toBeNull();
  });

  it('createPersona retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const persona = { id_persona: '1' };
    const result = await dataSource.createPersona(persona as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo crear persona: DB error/);
    }
  });

  it('updatePersona retorna persona correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const persona = { id_persona: '1' };
    const result = await dataSource.updatePersona('1', persona as any);
    expect(result).toHaveProperty('id_persona', '1');
  });

  it('updatePersona retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const persona = { id_persona: '1' };
    const result = await dataSource.updatePersona('1', persona as any);
    expect(result).toBeNull();
  });

  it('updatePersona retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const persona = { id_persona: '1' };
    const result = await dataSource.updatePersona('1', persona as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo actualizar persona: DB error/);
    }
  });

  it('deletePersona retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Eliminada' }] });
    const result = await dataSource.deletePersona('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Eliminada/);
  });

  it('deletePersona retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.deletePersona('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo eliminar persona/);
  });

  it('deletePersona retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.deletePersona('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo eliminar persona: DB error/);
  });

  it('getAliadosSede retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getAliadosSede('u1');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', '1');
  });

  it('getAliadosSede retorna array vacío si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getAliadosSede('u1');
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    }
  });

  it('getAliadosSede retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getAliadosSede('u1');
    expect('exitoso' in result).toBe(true);
    if ('mensaje' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener aliados: DB error/);
    }
  });

  it('getBeneficiariosSede retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getBenSedes();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', '1');
  });

  it('getBeneficiariosSede retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getBenSedes();
    expect('exitoso' in result).toBe(true);
    expect((result as any).exitoso).toBe('N');
    if ('mensaje' in result) {
      expect((result as any).mensaje).toMatch(/No se pudo obtener beneficiarios: DB error/);
    }
  });

  it('getBeneficiarios retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getBeneficiarios();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', '1');
  });

  it('getBeneficiarios retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getBeneficiarios();
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener beneficiarios: DB error/);
    }
  });

  it('getAll retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getAll(10, 0);
  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo obtener personas:/);
    expect(result.mensaje).toMatch(/custom/);
  }
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
    expect(result.mensaje).toMatch(/No se pudo obtener persona:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('createPersona retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const persona = { id_persona: '1' };
  const result = await dataSource.createPersona(persona as any);
  expect(result).toBeNull();
});

it('createPersona retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const persona = { id_persona: '1' };
  const result = await dataSource.createPersona(persona as any);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo crear persona:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('updatePersona retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const persona = { id_persona: '1' };
  const result = await dataSource.updatePersona('1', persona as any);
  expect(result).toBeNull();
});

it('updatePersona retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const persona = { id_persona: '1' };
  const result = await dataSource.updatePersona('1', persona as any);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar persona:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('deletePersona retorna error si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.deletePersona('1');
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo eliminar persona/);
});

it('deletePersona retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.deletePersona('1');
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo eliminar persona:/);
  expect(result.mensaje).toMatch(/custom/);
});

it('getAliadosSede retorna array vacío si no hay resultado', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.getAliadosSede('u1');
  expect(Array.isArray(result)).toBe(true);
  if (Array.isArray(result)) {
    expect(result.length).toBe(0);
  }
});

it('getAliadosSede retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getAliadosSede('u1');
  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.mensaje).toMatch(/No se pudo obtener aliados:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('getBeneficiariosSede retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getBenSedes();
  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo obtener beneficiarios:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('getBeneficiarios retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getBeneficiarios();
  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo obtener beneficiarios:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});
});