const mockQuery = jest.fn().mockResolvedValue({ rows: [] });
const mockConnect = jest.fn();
const mockOn = jest.fn();
const mockEnd = jest.fn();

jest.mock('../../../infrastructure/db/pool', () => ({
  pgPool: {
    query: (...args: unknown[]) => mockQuery(...args),
    connect: (...args: unknown[]) => mockConnect(...args),
    on: (...args: unknown[]) => mockOn(...args),
    end: (...args: unknown[]) => mockEnd(...args),
  },
  initDbPool: jest.fn(),
  closeDbPool: jest.fn(),
}));

jest.mock('../../../interfaces/services/secrets.service', () => ({
  SecretService: jest.fn().mockImplementation(() => ({
    getSecret: jest.fn().mockResolvedValue(undefined),
  })),
}));

import { personasProgramaResolvers } from '../personas-programa';

describe('personasProgramaResolvers', () => {
  beforeEach(() => {
    mockQuery.mockClear();
    mockConnect.mockClear();
    mockOn.mockClear();
    mockEnd.mockClear();
  });

    const mockPersonaPrograma = {
      id_persona_programa: '1',
      id_persona: '2',
      id_programa: '3',
      id_creado_por: 'user1',
      fecha_creacion: new Date('2023-01-01'),
      id_modificado_por: 'user2',
      fecha_modificacion: new Date('2023-01-02'),
    };
  it('debe definir los resolvers de Query y Mutation', () => {
    expect(personasProgramaResolvers.Query.getPersonaProgramaById).toBeDefined();
    expect(personasProgramaResolvers.Query.getPersonaProgramas).toBeDefined();
    expect(personasProgramaResolvers.Mutation.createPersonaPrograma).toBeDefined();
    expect(personasProgramaResolvers.Mutation.updatePersonaPrograma).toBeDefined();
    expect(personasProgramaResolvers.Mutation.deletePersonaPrograma).toBeDefined();
  });

  it('getPersonaProgramaById llama al método del controlador', async () => {
    const mockPersonaPrograma = {
      id_persona_programa: '1',
      id_persona: '2',
      id_programa: '3',
      id_creado_por: 'user1',
      fecha_creacion: new Date('2023-01-01'),
      id_modificado_por: 'user2',
      fecha_modificacion: new Date('2023-01-02'),
    };
    const spy = jest.spyOn(personasProgramaResolvers.Query, 'getPersonaProgramaById').mockResolvedValue(mockPersonaPrograma);
    const args = { id_persona_programa: '1' };
    await personasProgramaResolvers.Query.getPersonaProgramaById({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('getPersonaProgramas llama al método del controlador', async () => {
    const spy = jest.spyOn(personasProgramaResolvers.Query, 'getPersonaProgramas').mockResolvedValue([]);
    await personasProgramaResolvers.Query.getPersonaProgramas( {}, {limit: 1, offset: 100});
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('createPersonaPrograma llama al método del controlador', async () => {
    const mockPersonaPrograma = {
      id_persona_programa: '1',
      id_persona: '2',
      id_programa: '3',
      id_creado_por: 'user1',
      fecha_creacion: new Date('2023-01-01'),
      id_modificado_por: 'user2',
      fecha_modificacion: new Date('2023-01-02'),
    };
    const spy = jest.spyOn(personasProgramaResolvers.Mutation, 'createPersonaPrograma').mockResolvedValue({ exitoso: 'S' as 'S', mensaje: 'Creado correctamente' });
    const args = { personaPrograma: mockPersonaPrograma };
    await personasProgramaResolvers.Mutation.createPersonaPrograma({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('updatePersonaPrograma llama al método del controlador', async () => {
  
    const spy = jest.spyOn(personasProgramaResolvers.Mutation, 'updatePersonaPrograma').mockResolvedValue({ exitoso: 'S' as 'S', mensaje: 'Actualizado correctamente' });
    const args = { id_persona_programa: '1', personaPrograma: mockPersonaPrograma };
    await personasProgramaResolvers.Mutation.updatePersonaPrograma({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('deletePersonaPrograma llama al método del controlador', async () => {
  const mockRespuesta = { exitoso: 'S' as 'S', mensaje: 'Eliminado correctamente' };
  const spy = jest.spyOn(personasProgramaResolvers.Mutation, 'deletePersonaPrograma').mockResolvedValue(mockRespuesta);
  const args = { id_persona_programa: '1' };
  await personasProgramaResolvers.Mutation.deletePersonaPrograma({}, args);
  expect(spy).toHaveBeenCalledWith({}, args);
  spy.mockRestore();
  });

  it('getPersonaProgramaById ejecuta correctamente', async () => {
  const args = { id_persona_programa: '1' };
  const result = await personasProgramaResolvers.Query.getPersonaProgramaById({}, args);
  expect(result).not.toBeUndefined();
});

it('getPersonaProgramas ejecuta correctamente', async () => {
  const result = await personasProgramaResolvers.Query.getPersonaProgramas( {}, {limit: 1, offset: 100});
  expect(result).not.toBeUndefined();
});

it('createPersonaPrograma ejecuta correctamente', async () => {
  const args = { personaPrograma: mockPersonaPrograma };
  const result = await personasProgramaResolvers.Mutation.createPersonaPrograma({}, args);
  expect(result).not.toBeUndefined();
});

it('updatePersonaPrograma ejecuta correctamente', async () => {
  const args = { id_persona_programa: '1', personaPrograma: mockPersonaPrograma };
  const result = await personasProgramaResolvers.Mutation.updatePersonaPrograma({}, args);
  expect(result).not.toBeUndefined();
});

it('deletePersonaPrograma ejecuta correctamente', async () => {
  const args = { id_persona_programa: '1' };
  const result = await personasProgramaResolvers.Mutation.deletePersonaPrograma({}, args);
  expect(result).not.toBeUndefined();
});
});
