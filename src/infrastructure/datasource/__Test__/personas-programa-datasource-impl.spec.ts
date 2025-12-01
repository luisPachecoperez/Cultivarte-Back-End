import { PersonasProgramaDataSourceImpl } from '../personas-programa-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pg-pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('PersonasProgramaDataSourceImpl', () => {
  let dataSource: PersonasProgramaDataSourceImpl;

  beforeEach(() => {
    dataSource = new PersonasProgramaDataSourceImpl();
    jest.clearAllMocks();
  });

  it('getAll retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona_programa: '1' }] });
    const result = await dataSource.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona_programa', '1');
  });

  it('getAll retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getAll();
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener personas: DB error/);
    }
  });

    it('getAll retorna error si ocurre excepción no Error', async () => {
      (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
      const result = await dataSource.getAll();
      expect('exitoso' in result).toBe(true);
      if ('exitoso' in result) {
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toMatch(/No se pudo obtener personas: /);
        expect(result.mensaje).toMatch(/custom/);
      }
    });

  it('getById retorna personaPrograma correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona_programa: '1' }] });
    const result = await dataSource.getById('1');
    expect(result).toHaveProperty('id_persona_programa', '1');
  });

  it('getById retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Persona programa no encontrada/);
    } else {
      throw new Error('Expected RespuestaGrap error object');
    }
  });

  it('getById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener persona: DB error/);
    } else {
      throw new Error('Expected RespuestaGrap error object');
    }
  });

  it('getById retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener persona: /);
      expect(result.mensaje).toMatch(/custom/);
    } else {
      throw new Error('Expected RespuestaGrap error object');
    }
  });

  it('create retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Creada' }] });
    const personaPrograma = { id_persona_programa: '1', id_persona: '2', id_programa: '3' };
    const result = await dataSource.create(personaPrograma as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Creada/);
  });

  it('create retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const personaPrograma = { id_persona_programa: '1', id_persona: '2', id_programa: '3' };
    const result = await dataSource.create(personaPrograma as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo crear persona/);
  });

  it('create retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const personaPrograma = { id_persona_programa: '1', id_persona: '2', id_programa: '3' };
    const result = await dataSource.create(personaPrograma as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo crear persona: DB error/);
  });

  it('create retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const personaPrograma = { id_persona_programa: '1', id_persona: '2', id_programa: '3' };
    const result = await dataSource.create(personaPrograma as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo crear persona: /);
    expect(result.mensaje).toMatch(/custom/);
  });

  it('updateById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Actualizada' }] });
    const personaPrograma = { id_persona: '2', id_programa: '3' };
    const result = await dataSource.updateById('1', personaPrograma as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Actualizada/);
  });

  it('updateById retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const personaPrograma = { id_persona: '2', id_programa: '3' };
    const result = await dataSource.updateById('1', personaPrograma as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar persona/);
  });

  it('updateById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const personaPrograma = { id_persona: '2', id_programa: '3' };
    const result = await dataSource.updateById('1', personaPrograma as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar persona: DB error/);
  });

  it('updateById retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const personaPrograma = { id_persona: '2', id_programa: '3' };
    const result = await dataSource.updateById('1', personaPrograma as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar persona: /);
    expect(result.mensaje).toMatch(/custom/);
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
    expect(result.mensaje).toMatch(/No se pudo eliminar persona: DB error/);
  });

  it('deleteById retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo eliminar persona: /);
    expect(result.mensaje).toMatch(/custom/);
  });
});