
import { PersonaRepositoryImpl } from '../persona-repository-impl';

describe('PersonaRepositoryImpl', () => {
  let repo: PersonaRepositoryImpl;
  let mockDataSource: any;

  beforeEach(() => {
    mockDataSource = {
      getAll: jest.fn(),
      getById: jest.fn(),
      getAliadosSede: jest.fn(),
      getBenSedes: jest.fn(),
      createPersona: jest.fn(),
      updatePersona: jest.fn(),
      deletePersona: jest.fn(),
      getBeneficiarios: jest.fn(),
      getPreBeneficiarios: jest.fn(),
      getPersonasParams: jest.fn(),
      getPersonaByTipoIdenficacionNumeroIdentificacion: jest.fn(),
      updateBeneficiarios: jest.fn(),
    };
    repo = new PersonaRepositoryImpl(mockDataSource);
  });

  it('getAll retorna array si datasource retorna array', async () => {
    mockDataSource.getAll.mockResolvedValue([{ id_persona: 'p1' }]);
    const result = await repo.getAll(10, 0);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', 'p1');
  });

  it('getAll retorna array vacío si datasource retorna objeto', async () => {
    mockDataSource.getAll.mockResolvedValue({ exitoso: 'N' });
    const result = await repo.getAll(10, 0);
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    } else {
      expect(result).toHaveProperty('exitoso', 'N');
    }
  });

  it('getAll retorna error si ocurre excepción Error', async () => {
    mockDataSource.getAll.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.getAll(10, 0);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener personas: fail'),
    });
  });

  it('getAll retorna error si ocurre excepción no Error', async () => {
    mockDataSource.getAll.mockImplementation(() => { throw 'fail'; });
    const result = await repo.getAll(10, 0);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener personas: \"fail\"'),
    });
  });

  it('getById retorna resultado del datasource', async () => {
    mockDataSource.getById.mockResolvedValue({ id_persona: 'p1' });
    const result = await repo.getById('p1');
    expect(result).toHaveProperty('id_persona', 'p1');
  });

  it('getById retorna error si ocurre excepción Error', async () => {
    mockDataSource.getById.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.getById('p1');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener persona: fail'),
    });
  });

  it('getById retorna error si ocurre excepción no Error', async () => {
    mockDataSource.getById.mockImplementation(() => { throw 'fail'; });
    const result = await repo.getById('p1');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener persona: \"fail\"'),
    });
  });

  it('getAliadosSede retorna array si datasource retorna array', async () => {
    mockDataSource.getAliadosSede.mockResolvedValue([{ id_persona: 'a1' }]);
    const result = await repo.getAliadosSede('u1');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', 'a1');
  });

  it('getAliadosSede retorna array vacío si datasource retorna objeto', async () => {
    mockDataSource.getAliadosSede.mockResolvedValue({ exitoso: 'N' });
    const result = await repo.getAliadosSede('u1');
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    } else {
      expect(result).toHaveProperty('exitoso', 'N');
    }
  });

  it('getAliadosSede retorna error si ocurre excepción Error', async () => {
    mockDataSource.getAliadosSede.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.getAliadosSede('u1');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener aliados: fail'),
    });
  });

  it('getAliadosSede retorna error si ocurre excepción no Error', async () => {
    mockDataSource.getAliadosSede.mockImplementation(() => { throw 'fail'; });
    const result = await repo.getAliadosSede('u1');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener aliados: \"fail\"'),
    });
  });

  it('getBenSedes retorna array si datasource retorna array', async () => {
    mockDataSource.getBenSedes.mockResolvedValue([{ id_sede: 's1' }]);
    const result = await repo.getBenSedes();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_sede', 's1');
  });

  it('getBenSedes  retorna array vacío si datasource retorna objeto', async () => {
    mockDataSource.getBenSedes.mockResolvedValue({ exitoso: 'N' });
    const result = await repo.getBenSedes();
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    } else {
      expect(result).toHaveProperty('exitoso', 'N');
    }
  });

  it('getBenSedes retorna error si ocurre excepción Error', async () => {
    mockDataSource.getBenSedes.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.getBenSedes();
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener beneficiarios: fail'),
    });
  });

  it('getBenSedes retorna error si ocurre excepción no Error', async () => {
    mockDataSource.getBenSedes.mockImplementation(() => { throw 'fail'; });
    const result = await repo.getBenSedes();
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener beneficiarios: \"fail\"'),
    });
  });

  it('createPersona retorna resultado del datasource', async () => {
    mockDataSource.createPersona.mockResolvedValue({ id_persona: 'p1' });
    const result = await repo.createPersona({ id_persona: 'p1' } as any);
    expect(result).toHaveProperty('id_persona', 'p1');
  });

  it('createPersona retorna error si ocurre excepción Error', async () => {
    mockDataSource.createPersona.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.createPersona({ id_persona: 'p1' } as any);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo crear persona: fail'),
    });
  });

  it('createPersona retorna error si ocurre excepción no Error', async () => {
    mockDataSource.createPersona.mockImplementation(() => { throw 'fail'; });
    const result = await repo.createPersona({ id_persona: 'p1' } as any);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo crear persona: \"fail\"'),
    });
  });

  it('updatePersona retorna resultado del datasource', async () => {
    mockDataSource.updatePersona.mockResolvedValue({ id_persona: 'p1' });
    const result = await repo.updatePersona('p1', { id_persona: 'p1' } as any);
    expect(result).toHaveProperty('id_persona', 'p1');
  });

  it('updatePersona retorna error si ocurre excepción Error', async () => {
    mockDataSource.updatePersona.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.updatePersona('p1', { id_persona: 'p1' } as any);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo actualizar persona: fail'),
    });
  });

  it('updatePersona retorna error si ocurre excepción no Error', async () => {
    mockDataSource.updatePersona.mockImplementation(() => { throw 'fail'; });
    const result = await repo.updatePersona('p1', { id_persona: 'p1' } as any);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo actualizar persona: \"fail\"'),
    });
  });

  it('deletePersona retorna resultado del datasource', async () => {
    mockDataSource.deletePersona.mockResolvedValue({ exitoso: 'S' });
    const result = await repo.deletePersona('p1');
    expect(result).toHaveProperty('exitoso', 'S');
  });

  it('deletePersona retorna error si ocurre excepción Error', async () => {
    mockDataSource.deletePersona.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.deletePersona('p1');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo eliminar persona: fail'),
    });
  });

  it('deletePersona retorna error si ocurre excepción no Error', async () => {
    mockDataSource.deletePersona.mockImplementation(() => { throw 'fail'; });
    const result = await repo.deletePersona('p1');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo eliminar persona: \"fail\"'),
    });
  });

  it('getBeneficiarios retorna array si datasource retorna array', async () => {
    mockDataSource.getBeneficiarios.mockResolvedValue([{ id_persona: 'b1' }]);
    const result = await repo.getBeneficiarios();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', 'b1');
  });

  it('getBeneficiarios retorna array vacío si datasource retorna objeto', async () => {
    mockDataSource.getBeneficiarios.mockResolvedValue({ exitoso: 'N' });
    const result = await repo.getBeneficiarios();
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    } else {
      expect(result).toHaveProperty('exitoso', 'N');
    }
  });

  it('getBeneficiarios retorna error si ocurre excepción Error', async () => {
    mockDataSource.getBeneficiarios.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.getBeneficiarios();
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener beneficiarios: fail'),
    });
  });

  it('getPreBeneficiarios retorna array si datasource retorna array', async () => {
    mockDataSource.getPreBeneficiarios.mockResolvedValue([{ id_programa: 1 }]);
    const result = await repo.getPreBeneficiarios('user-1');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_programa', 1);
  });

  it('getPreBeneficiarios retorna array vacío si datasource retorna objeto', async () => {
    mockDataSource.getPreBeneficiarios.mockResolvedValue({ exitoso: 'N' });
    const result = await repo.getPreBeneficiarios('user-1');
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    }
  });

  it('getPreBeneficiarios retorna error si ocurre excepción Error', async () => {
    mockDataSource.getPreBeneficiarios.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.getPreBeneficiarios('user-1');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener pre beneficiarios: fail'),
    });
  });

  it('getPreBeneficiarios retorna error si ocurre excepción no Error', async () => {
    mockDataSource.getPreBeneficiarios.mockImplementation(() => { throw 'fail'; });
    const result = await repo.getPreBeneficiarios('user-1');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener pre beneficiarios: "fail"'),
    });
  });

  it('getPersonasParams retorna array si datasource retorna array', async () => {
    mockDataSource.getPersonasParams.mockResolvedValue([{ id_persona: 'p1' }]);
    const result = await repo.getPersonasParams('sede', 'prog', 'grupo', 1, 0);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', 'p1');
  });

  it('getPersonasParams retorna array vacío si datasource retorna objeto', async () => {
    mockDataSource.getPersonasParams.mockResolvedValue({ exitoso: 'N' });
    const result = await repo.getPersonasParams('sede', 'prog', 'grupo', 1, 0);
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    }
  });

  it('getPersonasParams retorna error si ocurre excepción Error', async () => {
    mockDataSource.getPersonasParams.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.getPersonasParams('sede', 'prog', 'grupo', 1, 0);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener personas con parámetros: fail'),
    });
  });

  it('getPersonasParams retorna error si ocurre excepción no Error', async () => {
    mockDataSource.getPersonasParams.mockImplementation(() => { throw 'fail'; });
    const result = await repo.getPersonasParams('sede', 'prog', 'grupo', 1, 0);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener personas con parámetros: "fail"'),
    });
  });

  it('getPersonaByTipoIdenficacionNumeroIdentificacion retorna resultado del datasource', async () => {
    mockDataSource.getPersonaByTipoIdenficacionNumeroIdentificacion.mockResolvedValue({ id_persona: 'p1' });
    const result = await repo.getPersonaByTipoIdenficacionNumeroIdentificacion('CC', '123');
    expect(result).toHaveProperty('id_persona', 'p1');
  });

  it('getPersonaByTipoIdenficacionNumeroIdentificacion retorna error si ocurre excepción Error', async () => {
    mockDataSource.getPersonaByTipoIdenficacionNumeroIdentificacion.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.getPersonaByTipoIdenficacionNumeroIdentificacion('CC', '123');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener persona por tipo y número de identificación: fail'),
    });
  });

  it('getPersonaByTipoIdenficacionNumeroIdentificacion retorna error si ocurre excepción no Error', async () => {
    mockDataSource.getPersonaByTipoIdenficacionNumeroIdentificacion.mockImplementation(() => { throw 'fail'; });
    const result = await repo.getPersonaByTipoIdenficacionNumeroIdentificacion('CC', '123');
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener persona por tipo y número de identificación: "fail"'),
    });
  });

  it('updateBeneficiarios retorna resultado del datasource', async () => {
    mockDataSource.updateBeneficiarios.mockResolvedValue({ exitoso: 'S' });
    const result = await repo.updateBeneficiarios({} as any);
    expect(result).toHaveProperty('exitoso', 'S');
  });

  it('updateBeneficiarios retorna error si ocurre excepción Error', async () => {
    mockDataSource.updateBeneficiarios.mockImplementation(() => { throw new Error('fail'); });
    const result = await repo.updateBeneficiarios({} as any);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo actualizar beneficiarios: fail'),
    });
  });

  it('updateBeneficiarios retorna error si ocurre excepción no Error', async () => {
    mockDataSource.updateBeneficiarios.mockImplementation(() => { throw 'fail'; });
    const result = await repo.updateBeneficiarios({} as any);
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo actualizar beneficiarios: "fail"'),
    });
  });

  it('getBeneficiarios retorna error si ocurre excepción no Error', async () => {
    mockDataSource.getBeneficiarios.mockImplementation(() => { throw 'fail'; });
    const result = await repo.getBeneficiarios();
    expect(result).toEqual({
      exitoso: 'N',
      mensaje: expect.stringContaining('No se pudo obtener beneficiarios: \"fail\"'),
    });
  });
});